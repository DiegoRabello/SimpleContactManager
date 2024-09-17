const DB_KEY = "@Contacts"
export const STORAGE_SERVICE = {
    listContacts: () => {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
        return JSON.parse(storage)
    }

    return []
},

createContact: (contact) => {
    const storage = localStorage.getItem(DB_KEY);

    const newContact = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone
    };

    if (storage) {
        const storageParsed = JSON.parse(storage);

        const contacts = [...storageParsed, newContact];

        return localStorage.setItem(DB_KEY, JSON.stringify(contacts));
    }

    return localStorage.setItem(DB_KEY, JSON.stringify([newContact]));
},
 deleteContact: (contactName) => {
    const storage = localStorage.getItem(DB_KEY);
    if (storage) {
      const contacts = JSON.parse(storage);
      const updatedContacts = contacts.filter(
        (contact) => contact.name !== contactName
      );
      localStorage.setItem(DB_KEY, JSON.stringify(updatedContacts));
    }
  },

updateTaskState: (taskDescription) => {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
        const storageParsed = JSON.parse(storage)

        const updatedTask = storageParsed.map(item => {
            if (item.description === taskDescription) {
                return {
                ...item,
                isCompleted: !item.isCompleted
                }
            }
            return item
        })
        return localStorage.setItem(DB_KEY, JSON.stringify(updatedTask))
        }
    return alert('Task not found');
    }
}
