const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 *
 * @returns {Object}
 */
async function listContacts() {
    try {
        return JSON.parse(await fs.readFile(contactsPath));
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * @param {String} contactId
 * @returns {Array}
 */
async function getContactById(contactId) {
    const data = await listContacts();

    return data.filter((ele) => ele.id === contactId);
}

/**
 * @param {String} contactId
 * @returns {String}
 */
async function removeContact(contactId) {
    const data = await listContacts();

    const newContacts = JSON.stringify(
        data.filter((ele) => ele.id !== contactId),
        null,
        2
    );

    try {
        fs.writeFile(contactsPath, newContacts);

        return contactId;
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * @param {String} name
 * @param {String} email
 * @param {String} phone
 * @returns {Object}
 */
async function addContact(name, email, phone) {
    const data = await listContacts();

    const newContacts = JSON.stringify(
        [...data, { name, email, phone }],
        null,
        2
    );

    try {
        fs.writeFile(contactsPath, newContacts);

        return { name, email, phone };
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
