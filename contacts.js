const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactsById = async (contactId) => {
  const contacts = await listContacts();
  contactId = String(contactId);
  const contact = contacts.find((c) => c.id === contactId);

  return contact || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(4),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  contactId = String(contactId);
  const contactIndex = contacts.findIndex((c) => c.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  const [result] = contacts.splice(contactIndex, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactsById,
  addContact,
  removeContact,
};
