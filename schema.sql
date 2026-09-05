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
  agreed INTEGER,          -- SQLite uses INTEGER (0/1) for BOOLEAN
  agreementSigned INTEGER, -- customer signed the agreement
  paymentDate TEXT,        -- ISO timestamp of payment
  expiryDate TEXT,         -- ISO timestamp of plan expiry (1 month after payment)
  paymentStatus TEXT,      -- null | paid | failed
  paymentId TEXT,          -- Razorpay payment ID
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

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  propertyType TEXT,
  size TEXT,
  plan TEXT,
  cycle TEXT,
  amount REAL,
  status TEXT,
  paymentId TEXT,
  referredBy TEXT,
  createdAt TEXT
);

CREATE TABLE IF NOT EXISTS stats (
  key TEXT PRIMARY KEY,
  value INTEGER
);

-- Insert default admin account
INSERT OR IGNORE INTO customers (id, name, phone, email, password, createdAt) 
VALUES ('admin', 'TrustWork Admin', '9448610107', 'admin@trustwork.co.in', 'admin123', '2024-01-01T00:00:00.000Z');

CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT,
  ratePerSqft REAL,
  numVisits INTEGER,
  numPhotos INTEGER,
  numVideos INTEGER,
  hasLiveCall INTEGER
);

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

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id TEXT PRIMARY KEY,
  couponCode TEXT,
  phone TEXT,
  orderId TEXT,
  redeemedAt TEXT
);
