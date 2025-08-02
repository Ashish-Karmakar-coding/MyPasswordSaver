import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { encrypt, decrypt } from './cryptoUtil.js';
import { setMasterPassword, checkMasterPassword } from './auth.js';

const app = express();
const PORT = 3000;
const DB_FILE = './backend/db.json';

app.use(cors());
app.use(bodyParser.json());

let isLoggedIn = false; // Simulated session for MVP

// Load DB
function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ master: null, accounts: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

// Save DB
function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ---------- ROUTES ---------- //

// Set Master Password
app.post('/set-master', async (req, res) => {
  const { master } = req.body;
  const db = loadDB();
  if (db.master) return res.status(400).json({ msg: "Master password already set." });
  db.master = await setMasterPassword(master);
  saveDB(db);
  res.json({ msg: "Master password set." });
});

// Login
app.post('/login', async (req, res) => {
  const { master } = req.body;
  const db = loadDB();
  const success = await checkMasterPassword(master, db.master);
  if (success) {
    isLoggedIn = true;
    res.json({ msg: "Login successful." });
  } else {
    res.status(401).json({ msg: "Invalid password." });
  }
});

// Get accounts
app.get('/accounts', (req, res) => {
  if (!isLoggedIn) return res.status(401).json({ msg: "Not authorized." });
  const db = loadDB();
  const accounts = db.accounts.map(acc => ({
    platform: acc.platform,
    username: acc.username,
    password: decrypt(acc.password)
  }));
  res.json(accounts);
});

// Add/Edit account
app.post('/accounts', (req, res) => {
  if (!isLoggedIn) return res.status(401).json({ msg: "Not authorized." });
  const { platform, username, password } = req.body;
  const db = loadDB();
  const encrypted = encrypt(password);

  const index = db.accounts.findIndex(acc => acc.platform === platform);
  if (index !== -1) {
    db.accounts[index] = { platform, username, password: encrypted };
  } else {
    db.accounts.push({ platform, username, password: encrypted });
  }
  saveDB(db);
  res.json({ msg: "Saved successfully." });
});

// Delete account
app.delete('/accounts/:platform', (req, res) => {
  if (!isLoggedIn) return res.status(401).json({ msg: "Not authorized." });
  const { platform } = req.params;
  const db = loadDB();
  db.accounts = db.accounts.filter(acc => acc.platform !== platform);
  saveDB(db);
  res.json({ msg: "Deleted successfully." });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
