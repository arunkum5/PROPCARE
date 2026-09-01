CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  password TEXT,
  createdAt TEXT
);

CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  customerId TEXT,
  type TEXT,
  title TEXT,
  address TEXT,
  latlong TEXT,
  size TEXT,
  summary TEXT,
  plan TEXT,
  status TEXT,
  agreed INTEGER, -- SQLite uses INTEGER (0/1) for BOOLEAN
  FOREIGN KEY(customerId) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS visits (
  id TEXT PRIMARY KEY,
  propertyId TEXT,
  kind TEXT,
  date TEXT,
  notes TEXT,
  photos TEXT, -- JSON array of URLs
  video TEXT,
  FOREIGN KEY(propertyId) REFERENCES properties(id)
);

CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  customerId TEXT,
  propertyId TEXT,
  subject TEXT,
  message TEXT,
  status TEXT,
  response TEXT,
  createdAt TEXT,
  FOREIGN KEY(customerId) REFERENCES customers(id),
  FOREIGN KEY(propertyId) REFERENCES properties(id)
);

-- Insert default admin account
INSERT OR IGNORE INTO customers (id, name, phone, email, password, createdAt) 
VALUES ('admin', 'TrustWork Admin', '9448610107', 'admin@trustwork.co.in', 'admin123', '2024-01-01T00:00:00.000Z');
