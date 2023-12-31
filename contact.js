const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "db", "contact.json");

const getAllContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await getAllContacts();
  const result = data.find((contact) => contact.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contact = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contact.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
};
