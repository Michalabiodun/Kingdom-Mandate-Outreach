const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '.env');
const envResult = dotenv.config({ 
  path: envPath,
  override: true
});
if (envResult.error) {
  console.log('Failed to load env file:', envPath, envResult.error);
} else {
  console.log('Loaded env file:', envPath);
}
const fallbackEnvPath = path.join(__dirname, 'kingdom-mandate-backend', '.env');
if ((!process.env.EMAIL_USER || !process.env.EMAIL_PASS) && require('fs').existsSync(fallbackEnvPath)) {
  const fb = dotenv.config({ path: fallbackEnvPath });
  if (!fb.error) {
    console.log('Loaded fallback env file:', fallbackEnvPath);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || JWT_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS refresh_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS testimonies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    isAnonymous BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    created_at TEXT NOT NULL
  )
`);

const emailIsValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const getUserByEmail = (email) => db.prepare('SELECT * FROM users WHERE email = ?').get(email);
const getUserById = (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id);
const getRefreshTokenByHash = (hash) =>
  db.prepare('SELECT * FROM refresh_tokens WHERE token_hash = ?').get(hash);
const createUser = (user) =>
  db
    .prepare(
      'INSERT INTO users (id, name, email, role, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    )
    .run(
      user.id,
      user.name,
      user.email,
      user.role,
      user.passwordHash,
      user.salt,
      user.createdAt,
    );
const issueToken = (user) =>
  jwt.sign(
    { sub: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
const issueRefreshToken = (user) =>
  jwt.sign(
    { sub: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
  );
const saveRefreshToken = (token, userId) => {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const decoded = jwt.decode(token);
  const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000).toISOString() : new Date().toISOString();
  db
    .prepare(
      'INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)',
    )
    .run(crypto.randomUUID(), userId, tokenHash, expiresAt, new Date().toISOString());
  return tokenHash;
};
const revokeRefreshToken = (token) => {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  db.prepare('DELETE FROM refresh_tokens WHERE token_hash = ?').run(tokenHash);
};
const parseDurationToMs = (value) => {
  if (typeof value !== 'string') {
    return 0;
  }
  const match = value.trim().match(/^(\d+)(s|m|h|d)$/i);
  if (!match) {
    return 0;
  }
  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const unitMs = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return amount * unitMs[unit];
};

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer transporter configuration
// Email configuration validation
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: process.env.EMAIL_USER && process.env.EMAIL_PASS ? {
    user: process.env.EMAIL_USER,
    pass: String(process.env.EMAIL_PASS).replace(/\s+/g, ''),
  } : null,
});

// Check email configuration
console.log('Environment variables loaded:');
console.log('- EMAIL_USER:', process.env.EMAIL_USER);
console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? '[HIDDEN]' : 'NOT_SET');
console.log('- CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
console.log('- ONE_TO_ONE_EMAIL:', process.env.ONE_TO_ONE_EMAIL);
console.log('- PRAYER_EMAIL:', process.env.PRAYER_EMAIL);
console.log('- MESSAGE_EMAIL:', process.env.MESSAGE_EMAIL);

if (transporter.options.auth) {
  console.log('Email configuration loaded successfully');
} else {
  console.log('Warning: Email credentials not configured. Email features will be disabled.');
}

// Email destinations for different forms
const EMAIL_DESTINATIONS = {
  'contact': process.env.CONTACT_EMAIL || process.env.EMAIL_USER || '',
  'one-to-one': process.env.ONE_TO_ONE_EMAIL || process.env.EMAIL_USER || '',
  'prayer-request': process.env.PRAYER_EMAIL || process.env.EMAIL_USER || '',
  'message': process.env.MESSAGE_EMAIL || process.env.EMAIL_USER || ''
};

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Error with email configuration:', error);
  } else {
    console.log('Server is ready to send emails');
    console.log('Email destinations:');
    console.log('- Contact Form:', EMAIL_DESTINATIONS.contact);
    console.log('- One-to-One:', EMAIL_DESTINATIONS['one-to-one']);
    console.log('- Prayer Requests:', EMAIL_DESTINATIONS['prayer-request']);
    console.log('- Messages:', EMAIL_DESTINATIONS.message);
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Error with email configuration:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Email template function
const createEmailTemplate = (type, data) => {
  let subject = '';
  let html = '';

  switch (type) {
   case 'one-to-one':
  subject = `🔵 One-to-One Session Request from ${data.title} ${data.firstName} ${data.surname}`;
  html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3c3b6e;">One-to-One Session Request</h2>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3c3b6e;">
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>First Name:</strong> ${data.firstName}</p>
        <p><strong>Middle Name:</strong> ${data.middleName || 'Not provided'}</p>
        <p><strong>Surname:</strong> ${data.surname}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Marital Status:</strong> ${data.maritalStatus}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
      </div>
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">Sent from Kingdom Mandate Outreach website - One-to-One Session Form</p>
    </div>
  `;
  break;

    case 'prayer-request':
      subject = `Prayer Request from ${data.firstName}`;
      html = `
        <h2>Prayer Request</h2>
        <p><strong>Name:</strong> ${data.firstName}</p>
        <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Prayer Request:</strong></p>
        <p>${data.message}</p>
        <hr>
        <p><em>Sent from Kingdom Mandate Outreach website</em></p>
      `;
      break;

    case 'testimonies':
  subject = `🙌 Testimony from ${data.fullName}`;
  html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ff6b00;">New Testimony</h2>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #ff6b00;">
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Testimony:</strong></p>
        <p style="background: white; padding: 10px; border-radius: 4px;">${data.message}</p>
      </div>
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">Sent from Kingdom Mandate Outreach website - Testimonies Form</p>
    </div>
  `;
  break;

    case 'contact-form':
      subject = `Contact Form Submission from ${data.firstName} ${data.lastName}`;
      html = `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
        <hr>
        <p><em>Sent from Kingdom Mandate Outreach website</em></p>
      `;
      break;
  }

  return { subject, html };
};

// Routes
app.post('/api/auth/register', (req, res) => {
  try {
    const { fullName, email, password } = req.body || {};
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (!emailIsValid(email)) {
      return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
    }
    const normalizedEmail = String(email).toLowerCase();
    if (getUserByEmail(normalizedEmail)) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');
    const user = {
      id: crypto.randomUUID(),
      name: String(fullName).trim(),
      email: normalizedEmail,
      role: 'Member',
      passwordHash,
      salt,
      createdAt: new Date().toISOString()
    };
    createUser(user);
    const token = issueToken(user);
    const refreshToken = issueRefreshToken(user);
    saveRefreshToken(refreshToken, user.id);
    res.cookie('km_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: NODE_ENV === 'production',
      maxAge: parseDurationToMs(REFRESH_TOKEN_EXPIRES_IN),
    });
    return res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to register. Please try again.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const normalizedEmail = String(email).toLowerCase();
    const user = getUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    const passwordHash = crypto.scryptSync(password, user.salt, 64).toString('hex');
    if (passwordHash !== user.password_hash) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    const token = issueToken(user);
    const refreshToken = issueRefreshToken(user);
    saveRefreshToken(refreshToken, user.id);
    res.cookie('km_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: NODE_ENV === 'production',
      maxAge: parseDurationToMs(REFRESH_TOKEN_EXPIRES_IN),
    });
    return res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to login. Please try again.' });
  }
});

app.post('/api/auth/refresh', (req, res) => {
  try {
    const token = req.cookies?.km_refresh;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }
    let payload;
    try {
      payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const stored = getRefreshTokenByHash(tokenHash);
    if (!stored) {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    const user = getUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }
    revokeRefreshToken(token);
    const newRefreshToken = issueRefreshToken(user);
    saveRefreshToken(newRefreshToken, user.id);
    res.cookie('km_refresh', newRefreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: NODE_ENV === 'production',
      maxAge: parseDurationToMs(REFRESH_TOKEN_EXPIRES_IN),
    });
    const accessToken = issueToken(user);
    return res.json({ success: true, token: accessToken });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to refresh session.' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  const token = req.cookies?.km_refresh;
  if (token) {
    revokeRefreshToken(token);
  }
  res.clearCookie('km_refresh', {
    httpOnly: true,
    sameSite: 'lax',
    secure: NODE_ENV === 'production',
  });
  return res.json({ success: true });
});

const authRequired = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

app.get('/api/auth/me', authRequired, (req, res) => {
  const userId = req.user?.sub;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  const user = getUserById(userId);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  return res.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: EMAIL_DESTINATIONS.contact,
      replyTo: email,
      ...createEmailTemplate('contact-form', { firstName, lastName, email, subject, message }) //line 129
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

app.post('/api/one-to-one', async (req, res) => {
  try {
    const { title, firstName, middleName, surname, gender, maritalStatus, email, phone} = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: EMAIL_DESTINATIONS['one-to-one'],
      replyTo: email,
      ...createEmailTemplate('one-to-one', { title, firstName, middleName, surname, gender, maritalStatus, email, phone })
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Session request submitted successfully!' });
  } catch (error) {
    console.error('One-to-one session error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit request. Please try again.' });
  }
});

app.post('/api/prayer-request', async (req, res) => {
  try {
    const { firstName, email, phone, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: EMAIL_DESTINATIONS['prayer-request'], //line167
      replyTo: email,
      ...createEmailTemplate('prayer-request', { firstName, email, phone, message })
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Prayer request submitted successfully!' });
  } catch (error) {
    console.error('Prayer request error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit prayer request. Please try again.' });
  }
});

app.post('/api/testimonies', async (req, res) => {
  try {
    const { fullName, email, message, title, isAnonymous } = req.body;
    
    // Generate unique ID
    const testimonyId = crypto.randomBytes(16).toString('hex');
    
    // Insert into database
    const stmt = db.prepare(`
      INSERT INTO testimonies (id, title, fullName, email, message, isAnonymous, approved, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      testimonyId,
      title || 'Testimony',
      fullName || 'Anonymous',
      email || 'anonymous@example.com',
      String(message || ''),
      isAnonymous ? 1 : 0,
      0,
      new Date().toISOString()
    );
    
    // Send email notification only if email is configured
    if (transporter.options.auth) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: EMAIL_DESTINATIONS.message,
          replyTo: email,
          ...createEmailTemplate('testimonies', { fullName, email, message })
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.log('Failed to send email notification:', emailError.message);
      }
    }
    
    res.json({ 
      success: true, 
      message: isAnonymous 
        ? 'Your anonymous testimony has been submitted successfully and will appear on landing page after approval!'
        : 'Testimony submitted successfully!' 
    });
  } catch (error) {
    console.error('Testimonies error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit testimony. Please try again.' });
  }
});

// GET endpoint for fetching approved testimonies
app.get('/api/testimonies', async (req, res) => {
  try {
    const { approved, limit } = req.query;
    
    let query = 'SELECT * FROM testimonies';
    const params = [];
    
    if (approved === 'true') {
      query += ' WHERE approved = ?';
      params.push(true);
    }
    
    query += ' ORDER BY created_at DESC';
    
    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }
    
    const testimonies = db.prepare(query).all(...params);
    
    res.json({ 
      success: true, 
      testimonials: testimonies 
    });
  } catch (error) {
    console.error('Fetch testimonies error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch testimonies.' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Kingdom Mandate Backend is running',
    emailDestinations: EMAIL_DESTINATIONS 
   });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
