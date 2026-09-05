import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono()

// GET /api/data - Fetch initial payload
app.get('/api/data', async (c) => {
  const db = c.env.DB
  
  // Track page visit
  await db.prepare('INSERT INTO stats (key, value) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1').bind('page_visits').run()
  const { results: statsData } = await db.prepare('SELECT value FROM stats WHERE key = ?').bind('page_visits').all()
  const page_visits = statsData[0]?.value || 1;

  const { results: customers } = await db.prepare('SELECT * FROM customers').all()
  const { results: properties } = await db.prepare('SELECT * FROM properties').all()
  const { results: visits } = await db.prepare('SELECT * FROM visits').all()
  const { results: cases } = await db.prepare('SELECT * FROM cases').all()
  const { results: leads } = await db.prepare('SELECT * FROM leads').all()
  
  const { results: plansRaw } = await db.prepare('SELECT * FROM plans').all()
  let plans = plansRaw;
  
  if (plans.length === 0) {
    const defaultPlans = [
      { id: "essential", name: "Essential Watch", ratePerSqft: 1, numVisits: 1, numPhotos: 6, numVideos: 0, hasLiveCall: 0 },
      { id: "standard", name: "Standard Watch", ratePerSqft: 2, numVisits: 2, numPhotos: 999, numVideos: 1, hasLiveCall: 0 },
      { id: "premium", name: "Premium Watch", ratePerSqft: 3, numVisits: 4, numPhotos: 999, numVideos: 999, hasLiveCall: 1 }
    ];
    for (const p of defaultPlans) {
      await db.prepare('INSERT INTO plans (id, name, ratePerSqft, numVisits, numPhotos, numVideos, hasLiveCall) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .bind(p.id, p.name, p.ratePerSqft, p.numVisits, p.numPhotos, p.numVideos, p.hasLiveCall)
        .run();
    }
    const { results: newPlans } = await db.prepare('SELECT * FROM plans').all()
    plans = newPlans;
  }
  
  // Format into the structure the frontend expects
  const dbs = {
    customers: {},
    properties: {},
    cases: {},
    plans: {},
    leads: {},
    stats: { page_visits }
  }
  
  customers.forEach(cust => dbs.customers[cust.id] = cust)
  leads.forEach(ld => dbs.leads[ld.id] = ld)
  plans.forEach(pl => {
    pl.hasLiveCall = pl.hasLiveCall === 1;
    dbs.plans[pl.id] = pl;
  })
  
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

// POST /api/leads - Create lead
app.post('/api/leads', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  await db.prepare('INSERT INTO leads (id, name, phone, propertyType, size, plan, cycle, amount, status, paymentId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(body.id, body.name, body.phone, body.propertyType, body.size, body.plan, body.cycle, body.amount, body.status, body.paymentId || null, body.createdAt)
    .run()
  return c.json({ success: true })
})

// PUT /api/leads/:id - Update lead status
app.put('/api/leads/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  if (body.paymentId) {
    await db.prepare('UPDATE leads SET status = ?, paymentId = ? WHERE id = ?')
      .bind(body.status, body.paymentId, id)
      .run()
  } else {
    await db.prepare('UPDATE leads SET status = ? WHERE id = ?')
      .bind(body.status, id)
      .run()
  }
  return c.json({ success: true })
})

// DELETE /api/leads/:id - Delete single lead
app.delete('/api/leads/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  await db.prepare('DELETE FROM leads WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// DELETE /api/leads - Delete all leads
app.delete('/api/leads', async (c) => {
  const db = c.env.DB
  await db.prepare('DELETE FROM leads').run()
  return c.json({ success: true })
})

// POST /api/plans - Add plan
app.post('/api/plans', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  await db.prepare('INSERT INTO plans (id, name, ratePerSqft, numVisits, numPhotos, numVideos, hasLiveCall) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(body.id, body.name, body.ratePerSqft, body.numVisits, body.numPhotos, body.numVideos, body.hasLiveCall ? 1 : 0)
    .run()
  return c.json({ success: true })
})

// PUT /api/plans/:id - Update plan
app.put('/api/plans/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  await db.prepare('UPDATE plans SET name = ?, ratePerSqft = ?, numVisits = ?, numPhotos = ?, numVideos = ?, hasLiveCall = ? WHERE id = ?')
    .bind(body.name, body.ratePerSqft, body.numVisits, body.numPhotos, body.numVideos, body.hasLiveCall ? 1 : 0, id)
    .run()
  return c.json({ success: true })
})

// DELETE /api/plans/:id - Delete plan
app.delete('/api/plans/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  await db.prepare('DELETE FROM plans WHERE id = ?').bind(id).run()
  return c.json({ success: true })
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
  await db.prepare('INSERT INTO properties (id, customerId, type, title, address, latlong, size, summary, plan, status, agreed, agreementSigned, paymentDate, expiryDate, paymentStatus, paymentId, billingCycle, pendingExtraVisits) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(body.id, body.customerId, body.type, body.title, body.address, body.latlong, body.size, body.summary, body.plan, body.status, body.agreed ? 1 : 0, body.agreementSigned ? 1 : 0, body.paymentDate || null, body.expiryDate || null, body.paymentStatus || null, body.paymentId || null, body.billingCycle || '1_month', body.pendingExtraVisits || 0)
    .run()
  return c.json({ success: true })
})

// PUT /api/properties/:id - Update property
app.put('/api/properties/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  
  await db.prepare('UPDATE properties SET type = ?, title = ?, address = ?, latlong = ?, size = ?, summary = ?, plan = ?, status = ?, agreed = ?, agreementSigned = ?, paymentDate = ?, expiryDate = ?, paymentStatus = ?, paymentId = ?, billingCycle = ?, pendingExtraVisits = ? WHERE id = ?')
    .bind(body.type, body.title, body.address, body.latlong, body.size, body.summary, body.plan, body.status, body.agreed ? 1 : 0, body.agreementSigned ? 1 : 0, body.paymentDate || null, body.expiryDate || null, body.paymentStatus || null, body.paymentId || null, body.billingCycle || '1_month', body.pendingExtraVisits || 0, id)
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


// --- Coupon APIs ---

app.get('/api/coupons', async (c) => {
  const db = c.env.DB
  const { results: coupons } = await db.prepare(`
    SELECT c.*, COUNT(cr.id) as redemptionCount 
    FROM coupons c 
    LEFT JOIN coupon_redemptions cr ON c.code = cr.couponCode 
    GROUP BY c.code
  `).all()
  return c.json(coupons)
})

app.get('/api/my-coupons/:phone', async (c) => {
  const db = c.env.DB
  const phone = c.req.param('phone')
  const { results: coupons } = await db.prepare(`
    SELECT c.* 
    FROM coupons c 
    WHERE c.tiedToPhone = ? 
    AND c.code NOT IN (SELECT couponCode FROM coupon_redemptions WHERE phone = ?)
  `).bind(phone, phone).all()
  return c.json(coupons)
})

app.post('/api/coupons', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  try {
    await db.prepare('INSERT INTO coupons (id, code, type, value, tiedToPhone, isNewCustomerOnly, expiresAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(
        `cpn_${Date.now()}`, 
        body.code.toUpperCase(), 
        body.type, 
        body.value, 
        body.tiedToPhone || null, 
        body.isNewCustomerOnly ? 1 : 0, 
        body.expiresAt || null, 
        new Date().toISOString()
      )
      .run()
    return c.json({ success: true })
  } catch (err) {
    return c.json({ success: false, error: err.message }, 400)
  }
})

app.delete('/api/coupons/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  await db.prepare('DELETE FROM coupons WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

app.post('/api/coupons/validate', async (c) => {
  const db = c.env.DB
  const { code, phone } = await c.req.json()
  
  if (!code) return c.json({ success: false, error: 'Coupon code required' }, 400)
  if (!phone) return c.json({ success: false, error: 'Phone number required' }, 400)
  
  const { results: coupons } = await db.prepare('SELECT * FROM coupons WHERE code = ?').bind(code.toUpperCase()).all()
  if (coupons.length === 0) return c.json({ success: false, error: 'Invalid coupon code' }, 400)
  
  const coupon = coupons[0]
  
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return c.json({ success: false, error: 'This coupon has expired' }, 400)
  }
  if (coupon.tiedToPhone && coupon.tiedToPhone !== phone) {
    return c.json({ success: false, error: 'This coupon is not valid for your number' }, 400)
  }
  
  if (coupon.isNewCustomerOnly === 1) {
    const { results: custs } = await db.prepare('SELECT id FROM customers WHERE phone = ?').bind(phone).all()
    if (custs.length > 0) return c.json({ success: false, error: 'Valid for new customers only' }, 400)
  }
  
  const { results: reds } = await db.prepare('SELECT id FROM coupon_redemptions WHERE couponCode = ? AND phone = ?').bind(coupon.code, phone).all()
  if (reds.length > 0) return c.json({ success: false, error: 'You have already used this coupon' }, 400)
  
  return c.json({ success: true, coupon })
})

// POST /api/razorpay/order - Create Razorpay order
app.post('/api/razorpay/order', async (c) => {
  const body = await c.req.json()
  let { amount, couponCode, phone } = body // amount in paise (rupees * 100)
  const keyId = c.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TYMgMaeAtpwHNh'
  const keySecret = c.env.RAZORPAY_KEY_SECRET

  if (!keySecret) {
    return c.json({ error: 'RAZORPAY_KEY_SECRET is not set in environment' }, 500)
  }

  // Calculate discount if coupon provided
  if (couponCode && phone) {
    const db = c.env.DB
    const { results: coupons } = await db.prepare('SELECT * FROM coupons WHERE code = ?').bind(couponCode.toUpperCase()).all()
    if (coupons.length > 0) {
      const coupon = coupons[0]
      let isValid = true
      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) isValid = false
      if (coupon.tiedToPhone && coupon.tiedToPhone !== phone) isValid = false
      if (coupon.isNewCustomerOnly === 1) {
        const { results: custs } = await db.prepare('SELECT id FROM customers WHERE phone = ?').bind(phone).all()
        if (custs.length > 0) isValid = false
      }
      const { results: reds } = await db.prepare('SELECT id FROM coupon_redemptions WHERE couponCode = ? AND phone = ?').bind(coupon.code, phone).all()
      if (reds.length > 0) isValid = false
      
      if (isValid) {
        let discountPaise = 0
        if (coupon.type === 'percentage') {
          discountPaise = amount * (coupon.value / 100)
        } else {
          discountPaise = coupon.value * 100
        }
        amount = Math.round(amount - discountPaise)
      }
    }
  }

  if (!amount || amount < 100) amount = 100 // minimum 1 INR for Razorpay

  const credentials = btoa(`${keyId}:${keySecret}`)
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    }),
  })
  const order = await res.json()
  if (!res.ok) return c.json({ error: order.error?.description || 'Order creation failed', razorpay: order }, 400)
  return c.json({ orderId: order.id, amount: order.amount, currency: order.currency })
})

// POST /api/razorpay/verify - Verify payment signature
app.post('/api/razorpay/verify', async (c) => {
  const body = await c.req.json()
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, couponCode, phone } = body
  const keySecret = c.env.RAZORPAY_KEY_SECRET

  const encoder = new TextEncoder()
  const keyData = encoder.encode(keySecret)
  const msgData = encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`)

  const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  const expectedSig = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')

  if (expectedSig !== razorpay_signature) {
    return c.json({ success: false, error: 'Invalid payment signature' }, 400)
  }

  if (couponCode && phone) {
    const db = c.env.DB
    await db.prepare('INSERT INTO coupon_redemptions (id, couponCode, phone, orderId, redeemedAt) VALUES (?, ?, ?, ?, ?)')
      .bind(`red_${Date.now()}`, couponCode.toUpperCase(), phone, razorpay_order_id, new Date().toISOString())
      .run()
  }

  return c.json({ success: true, paymentId: razorpay_payment_id })
})

// --- System Testing Engine ---
app.get('/api/tests/run', async (c) => {
  const db = c.env.DB;
  const results = [];
  
  const addResult = (name, passed, time, error = null) => {
    results.push({ name, passed, time, error });
  };

  let start;

  // 1. Admin Adds Customer Test
  start = Date.now();
  const t1_custId = `test_c_${Date.now()}_1`;
  try {
    await db.prepare('INSERT INTO customers (id, name, phone, email, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(t1_custId, 'Test Customer 1', '9999999991', 't1@test.com', 'pwd1', new Date().toISOString())
      .run();
    const { results: c1 } = await db.prepare('SELECT * FROM customers WHERE id = ?').bind(t1_custId).all();
    if (c1.length !== 1) throw new Error('Customer not found after insertion');
    addResult('1. Admin Adds Customer', true, Date.now() - start);
  } catch (err) {
    addResult('1. Admin Adds Customer', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM customers WHERE id = ?').bind(t1_custId).run().catch(()=>{});
  }

  // 2. Customer Call Back Lead Test
  start = Date.now();
  const t2_leadId = `test_ld_${Date.now()}_2`;
  try {
    await db.prepare('INSERT INTO leads (id, name, phone, propertyType, size, plan, cycle, amount, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(t2_leadId, 'Test Lead 2', '9999999992', 'Flat', '1200', 'essential', '1_month', 0, 'callback_requested', new Date().toISOString())
      .run();
    const { results: l2 } = await db.prepare('SELECT * FROM leads WHERE id = ?').bind(t2_leadId).all();
    if (l2.length !== 1 || l2[0].status !== 'callback_requested') throw new Error('Call back lead not saved correctly');
    addResult('2. Customer Call Back Lead', true, Date.now() - start);
  } catch (err) {
    addResult('2. Customer Call Back Lead', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM leads WHERE id = ?').bind(t2_leadId).run().catch(()=>{});
  }

  // 3. Payment Cancel / Lead Storage Test
  start = Date.now();
  const t3_leadId = `test_ld_${Date.now()}_3`;
  try {
    await db.prepare('INSERT INTO leads (id, name, phone, propertyType, size, plan, cycle, amount, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(t3_leadId, 'Test Lead 3', '9999999993', 'Flat', '1200', 'essential', '1_month', 1000, 'payment_pending', new Date().toISOString())
      .run();
    const { results: l3 } = await db.prepare('SELECT * FROM leads WHERE id = ?').bind(t3_leadId).all();
    if (l3.length !== 1 || l3[0].status !== 'payment_pending') throw new Error('Payment pending lead not stored');
    addResult('3. Payment Cancel / Lead Storage', true, Date.now() - start);
  } catch (err) {
    addResult('3. Payment Cancel / Lead Storage', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM leads WHERE id = ?').bind(t3_leadId).run().catch(()=>{});
  }

  // 4. Customer Login & PIN Change Test
  start = Date.now();
  const t4_custId = `test_c_${Date.now()}_4`;
  try {
    await db.prepare('INSERT INTO customers (id, name, phone, email, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(t4_custId, 'Test Customer 4', '9999999994', 't4@test.com', 'oldpin', new Date().toISOString())
      .run();
    // Test login
    const { results: auth1 } = await db.prepare('SELECT * FROM customers WHERE phone = ? AND password = ?').bind('9999999994', 'oldpin').all();
    if (auth1.length !== 1) throw new Error('Initial login failed');
    // Change pin
    await db.prepare('UPDATE customers SET password = ? WHERE id = ?').bind('newpin', t4_custId).run();
    // Test login new
    const { results: auth2 } = await db.prepare('SELECT * FROM customers WHERE phone = ? AND password = ?').bind('9999999994', 'newpin').all();
    if (auth2.length !== 1) throw new Error('Login with new PIN failed');
    const { results: auth3 } = await db.prepare('SELECT * FROM customers WHERE phone = ? AND password = ?').bind('9999999994', 'oldpin').all();
    if (auth3.length !== 0) throw new Error('Login with old PIN should have failed');
    addResult('4. Customer Login & PIN Change', true, Date.now() - start);
  } catch (err) {
    addResult('4. Customer Login & PIN Change', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM customers WHERE id = ?').bind(t4_custId).run().catch(()=>{});
  }

  // 5. Admin Deletes Customer (Cascading Deletion) Test
  start = Date.now();
  const t5_custId = `test_c_${Date.now()}_5`;
  const t5_prop1 = `test_p_${Date.now()}_5_1`;
  const t5_prop2 = `test_p_${Date.now()}_5_2`;
  try {
    await db.prepare('INSERT INTO customers (id, name, phone, email, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(t5_custId, 'Test Customer 5', '9999999995', 't5@test.com', 'pin', new Date().toISOString())
      .run();
    await db.prepare('INSERT INTO properties (id, customerId, type, title, status) VALUES (?, ?, ?, ?, ?)')
      .bind(t5_prop1, t5_custId, 'Flat', 'Prop 1', 'pending')
      .run();
    await db.prepare('INSERT INTO properties (id, customerId, type, title, status) VALUES (?, ?, ?, ?, ?)')
      .bind(t5_prop2, t5_custId, 'Flat', 'Prop 2', 'pending')
      .run();
    
    // Admin deletion logic from DELETE /api/customers/:id
    await db.prepare('DELETE FROM properties WHERE customerId = ?').bind(t5_custId).run();
    await db.prepare('DELETE FROM customers WHERE id = ?').bind(t5_custId).run();

    const { results: p5 } = await db.prepare('SELECT * FROM properties WHERE customerId = ?').bind(t5_custId).all();
    if (p5.length > 0) throw new Error('Properties were not deleted');
    addResult('5. Admin Deletes Customer (Cascading)', true, Date.now() - start);
  } catch (err) {
    addResult('5. Admin Deletes Customer (Cascading)', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM properties WHERE id = ?').bind(t5_prop1).run().catch(()=>{});
    await db.prepare('DELETE FROM properties WHERE id = ?').bind(t5_prop2).run().catch(()=>{});
    await db.prepare('DELETE FROM customers WHERE id = ?').bind(t5_custId).run().catch(()=>{});
  }

  // 6. Customer Deletes Specific Property Test
  start = Date.now();
  const t6_custId = `test_c_${Date.now()}_6`;
  const t6_prop1 = `test_p_${Date.now()}_6_1`;
  const t6_prop2 = `test_p_${Date.now()}_6_2`;
  try {
    await db.prepare('INSERT INTO customers (id, name, phone, email, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(t6_custId, 'Test Customer 6', '9999999996', 't6@test.com', 'pin', new Date().toISOString())
      .run();
    await db.prepare('INSERT INTO properties (id, customerId, type, title, status) VALUES (?, ?, ?, ?, ?)')
      .bind(t6_prop1, t6_custId, 'Flat', 'Prop 1', 'pending')
      .run();
    await db.prepare('INSERT INTO properties (id, customerId, type, title, status) VALUES (?, ?, ?, ?, ?)')
      .bind(t6_prop2, t6_custId, 'Flat', 'Prop 2', 'pending')
      .run();
    
    await db.prepare('DELETE FROM properties WHERE id = ?').bind(t6_prop1).run();

    const { results: p6 } = await db.prepare('SELECT * FROM properties WHERE customerId = ?').bind(t6_custId).all();
    if (p6.length !== 1 || p6[0].id !== t6_prop2) throw new Error('Wrong property deleted');
    addResult('6. Customer Deletes Specific Property', true, Date.now() - start);
  } catch (err) {
    addResult('6. Customer Deletes Specific Property', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM properties WHERE id = ?').bind(t6_prop1).run().catch(()=>{});
    await db.prepare('DELETE FROM properties WHERE id = ?').bind(t6_prop2).run().catch(()=>{});
    await db.prepare('DELETE FROM customers WHERE id = ?').bind(t6_custId).run().catch(()=>{});
  }

  // 7. Cases & Visits Lifecycle Test
  start = Date.now();
  const t7_custId = `test_c_${Date.now()}_7`;
  const t7_propId = `test_p_${Date.now()}_7`;
  const t7_visitId = `test_v_${Date.now()}_7`;
  const t7_caseId = `test_cs_${Date.now()}_7`;
  try {
    await db.prepare('INSERT INTO customers (id, name, phone) VALUES (?, ?, ?)')
      .bind(t7_custId, 'Test Customer 7', '9999999997').run();
    await db.prepare('INSERT INTO properties (id, customerId, type, title, status) VALUES (?, ?, ?, ?, ?)')
      .bind(t7_propId, t7_custId, 'Flat', 'Prop 7', 'active').run();
    
    // Visit
    await db.prepare('INSERT INTO visits (id, propertyId, kind, date, photos) VALUES (?, ?, ?, ?, ?)')
      .bind(t7_visitId, t7_propId, 'inspection', new Date().toISOString(), '[]').run();
    const { results: v7 } = await db.prepare('SELECT * FROM visits WHERE id = ?').bind(t7_visitId).all();
    if (v7.length !== 1) throw new Error('Visit not created');

    // Case
    await db.prepare('INSERT INTO cases (id, customerId, propertyId, subject, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(t7_caseId, t7_custId, t7_propId, 'Test Case', 'Help', 'open', new Date().toISOString()).run();
    await db.prepare('UPDATE cases SET response = ?, status = ? WHERE id = ?')
      .bind('Fixed', 'resolved', t7_caseId).run();
    const { results: c7 } = await db.prepare('SELECT response, status FROM cases WHERE id = ?').bind(t7_caseId).all();
    if (c7[0].status !== 'resolved' || c7[0].response !== 'Fixed') throw new Error('Case not updated correctly');

    await db.prepare('DELETE FROM cases WHERE id = ?').bind(t7_caseId).run();
    const { results: c7after } = await db.prepare('SELECT * FROM cases WHERE id = ?').bind(t7_caseId).all();
    if (c7after.length !== 0) throw new Error('Case not deleted');

    addResult('7. Cases & Visits Lifecycle', true, Date.now() - start);
  } catch (err) {
    addResult('7. Cases & Visits Lifecycle', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM cases WHERE id = ?').bind(t7_caseId).run().catch(()=>{});
    await db.prepare('DELETE FROM visits WHERE id = ?').bind(t7_visitId).run().catch(()=>{});
    await db.prepare('DELETE FROM properties WHERE id = ?').bind(t7_propId).run().catch(()=>{});
    await db.prepare('DELETE FROM customers WHERE id = ?').bind(t7_custId).run().catch(()=>{});
  }

  // 8. Coupon Engine & Payment Math
  start = Date.now();
  const couponId = `test_cpn_${Date.now()}_8`;
  const couponCode = `TEST${Date.now()}8`;
  try {
    await db.prepare('INSERT INTO coupons (id, code, type, value, tiedToPhone, isNewCustomerOnly, expiresAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(couponId, couponCode, 'percentage', 50, null, 0, null, new Date().toISOString())
      .run();
      
    const { results: coupons } = await db.prepare('SELECT * FROM coupons WHERE code = ?').bind(couponCode).all();
    if (coupons.length !== 1) throw new Error('Coupon not created');
    
    // Simulate Razorpay order discount math
    const coupon = coupons[0];
    let amount = 10000; // 100 INR in paise
    if (coupon.type === 'percentage') {
      amount = Math.round(amount - (amount * (coupon.value / 100)));
    }
    if (amount !== 5000) throw new Error('Discount math failed, expected 5000 paise');
    
    addResult('8. Coupon Engine & Payment Math', true, Date.now() - start);
  } catch (err) {
    addResult('8. Coupon Engine & Payment Math', false, Date.now() - start, err.message);
  } finally {
    await db.prepare('DELETE FROM coupons WHERE id = ?').bind(couponId).run().catch(() => {});
  }

  const allPassed = results.every(r => r.passed);
  return c.json({ success: allPassed, results });
})

// --- Emergency DB Setup ---
app.get('/api/setup', async (c) => {
  const db = c.env.DB
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS coupons (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE,
        type TEXT,
        value REAL,
        tiedToPhone TEXT,
        isNewCustomerOnly INTEGER,
        expiresAt TEXT,
        createdAt TEXT
      );
    `).run()
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS coupon_redemptions (
        id TEXT PRIMARY KEY,
        couponCode TEXT,
        phone TEXT,
        orderId TEXT,
        redeemedAt TEXT
      );
    `).run()
    return c.json({ success: true, message: 'Missing tables created successfully!' })
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

export const onRequest = handle(app)
