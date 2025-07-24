const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// GET all contacts
const getAllContacts = async (req, res) => {
  const db = getDb();
  try {
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error: err });
  }
};

// GET single contact by ID
const getContactById = async (req, res) => {
  const db = getDb();
  try {
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve contact', error: err });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
