import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono()

// GET /api/data - Fetch initial payload
app.get('/api/data', async (c) => {
  const db = c.env.DB
  
  const { results: customers } = await db.prepare('SELECT * FROM customers').all()
  const { results: properties } = await db.prepare('SELECT * FROM properties').all()
  const { results: visits } = await db.prepare('SELECT * FROM visits').all()
  const { results: cases } = await db.prepare('SELECT * FROM cases').all()
  
  // Format into the structure the frontend expects
  const dbs = {
    customers: {},
    properties: {},
    cases: {}
  }
  
  customers.forEach(cust => dbs.customers[cust.id] = cust)
  
  // Attach visits to properties
  properties.forEach(prop => {
    prop.agreed = prop.agreed === 1; // Map back to boolean
    prop.visits = visits.filter(v => v.propertyId === prop.id).map(v => {
      let parsedVideos = [];
      if (v.video) {
        try { parsedVideos = v.video.startsWith('[') ? JSON.parse(v.video) : [v.video]; } catch(e) { parsedVideos = [v.video]; }
      }
      return {
        ...v,
        photos: v.photos ? JSON.parse(v.photos) : [],
        videos: parsedVideos
      };
    })
    dbs.properties[prop.id] = prop
  })
  
  cases.forEach(cs => dbs.cases[cs.id] = cs)
  
  return c.json(dbs)
})

// POST /api/customers - Add customer
app.post('/api/customers', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  await db.prepare('INSERT INTO customers (id, name, phone, email, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(body.id, body.name, body.phone, body.email, body.password, body.createdAt)
    .run()
  return c.json({ success: true })
})

// PUT /api/customers/:id - Update customer
app.put('/api/customers/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  await db.prepare('UPDATE customers SET name = ?, phone = ?, email = ?, password = ? WHERE id = ?')
    .bind(body.name, body.phone, body.email, body.password, id)
    .run()
  return c.json({ success: true })
})

// DELETE /api/customers/:id - Delete customer and all related data
app.delete('/api/customers/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  // Cascade delete logic (SQLite foreign keys might not have ON DELETE CASCADE set, so we do it manually)
  const { results: props } = await db.prepare('SELECT id FROM properties WHERE customerId = ?').bind(id).all()
  for (const p of props) {
    await db.prepare('DELETE FROM visits WHERE propertyId = ?').bind(p.id).run()
  }
  await db.prepare('DELETE FROM cases WHERE customerId = ?').bind(id).run()
  await db.prepare('DELETE FROM properties WHERE customerId = ?').bind(id).run()
  await db.prepare('DELETE FROM customers WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// POST /api/properties - Add property
app.post('/api/properties', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  await db.prepare('INSERT INTO properties (id, customerId, type, title, address, latlong, size, summary, plan, status, agreed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(body.id, body.customerId, body.type, body.title, body.address, body.latlong, body.size, body.summary, body.plan, body.status, body.agreed ? 1 : 0)
    .run()
  return c.json({ success: true })
})

// PUT /api/properties/:id - Update property
app.put('/api/properties/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  
  await db.prepare('UPDATE properties SET type = ?, title = ?, address = ?, latlong = ?, size = ?, summary = ?, plan = ?, status = ?, agreed = ? WHERE id = ?')
    .bind(body.type, body.title, body.address, body.latlong, body.size, body.summary, body.plan, body.status, body.agreed ? 1 : 0, id)
    .run()
  
  return c.json({ success: true })
})

// DELETE /api/properties/:id - Delete property and related data
app.delete('/api/properties/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  await db.prepare('DELETE FROM visits WHERE propertyId = ?').bind(id).run()
  await db.prepare('DELETE FROM cases WHERE propertyId = ?').bind(id).run()
  await db.prepare('DELETE FROM properties WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// POST /api/cases - Add case
app.post('/api/cases', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  await db.prepare('INSERT INTO cases (id, customerId, propertyId, subject, message, status, response, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(body.id, body.customerId, body.propertyId || null, body.subject, body.message, body.status, body.response || '', body.createdAt)
    .run()
  return c.json({ success: true })
})

// PUT /api/cases/:id - Update case (respond)
app.put('/api/cases/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  await db.prepare('UPDATE cases SET status = ?, response = ? WHERE id = ?')
    .bind(body.status, body.response, id)
    .run()
  return c.json({ success: true })
})

// POST /api/visits - Add visit
app.post('/api/visits', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  await db.prepare('INSERT INTO visits (id, propertyId, kind, date, notes, photos, video) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(body.id, body.propertyId, body.kind, body.date, body.notes, JSON.stringify(body.photos || []), JSON.stringify(body.videos || []))
    .run()
  return c.json({ success: true })
})

// POST /api/upload - Upload file to R2
app.post('/api/upload', async (c) => {
  const bucket = c.env.MEDIA_BUCKET
  const body = await c.req.parseBody()
  const file = body['file']
  
  if (!file) return c.json({ error: 'No file provided' }, 400)
  
  const key = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type }
  })
  
  return c.json({ url: `/api/media/${key}` })
})

// GET /api/media/:key - Serve file from R2
app.get('/api/media/:key', async (c) => {
  const bucket = c.env.MEDIA_BUCKET
  const key = c.req.param('key')
  const object = await bucket.get(key)
  
  if (!object) return c.text('Not found', 404)
  
  c.header('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream')
  return c.body(object.body)
})

export const onRequest = handle(app)
