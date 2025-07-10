const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI, {
  tlsAllowInvalidCertificates: true, // TEMPORARY workaround
});

let db;

async function connectToDb() {
  try {
    await client.connect();
    db = client.db(); // Will use the DB name from URI
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connectToDb,
  getDb
};
