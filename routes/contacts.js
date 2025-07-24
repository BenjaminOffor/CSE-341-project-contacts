const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// Route for all contacts
router.get('/', contactsController.getAllContacts);

// Route for single contact by ID
router.get('/:id', contactsController.getContactById);

router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;

