import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database. done
// Export a function we will use to PUT to the database.
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Create a connection to the database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transactionand specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .put method on the store.
  const request = store.put({ id: 1, value: content });
  // get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};
// TODO: Add logic for a method that gets all the content from the database. done
// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the databaseand version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .get method to get data in the database.
  const request = store.get(1);
  // Get confirmation of the request.
  const result = await request;
  result
    ? console.log('Data from the database', result.value)
    : console.log('Data not in the database');
  return result?.value;
};

initdb();
