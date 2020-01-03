import Dexie from 'dexie';

const db = new Dexie("ToDoDb");
db.version(1).stores({
    tasks: `++id`,
    preferences: `++id`
});

export default db;