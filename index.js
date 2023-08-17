const contact = require("./contact");
const { program } = require("commander");

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");

program.parse();
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContact = await contact.getAllContacts();
      return console.table(allContact);

    case "get":
      const oneContact = await contact.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contact.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const updateContact = await contact.removeContact(id);
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
