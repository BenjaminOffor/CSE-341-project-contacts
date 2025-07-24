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

// POST - Create new contact
const createContact = async (req, res) => {
  const db = getDb();
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact', error: err });
  }
};

// PUT - Update contact
const updateContact = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  try {
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          firstName,
          lastName,
          email,
          favoriteColor,
          birthday
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact', error: err });
  }
};

// DELETE - Remove contact
const deleteContact = async (req, res) => {
  const db = getDb();
  const { id } = req.params;

  try {
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contact', error: err });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};

