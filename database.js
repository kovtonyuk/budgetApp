import SQLite from 'react-native-sqlite-storage';

const UserSchema = {
  name: 'User',
  properties: {
    email: 'string',
    password: 'string',
  },
};

const db = SQLite.openDatabase({ name: 'BudgetApp.db', location: 'default' }, 
  () => console.log('Database opened successfully'),
  (error) => console.log('Error opening database:', error)
);

export const initDB = () => {
  console.log('Initializing database...');
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );`,
      [],
      () => console.log('Database initialized successfully'),
      (tx, error) => console.log('Error initializing database:', error)
    );
  });
};

export const addUser = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log('Adding user:', email, password);
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, password],
        (_, result) => {
          console.log('User added successfully:', result);
          resolve(result);
        },
        (_, error) => {
          console.log('Error adding user:', error);
          reject(error);
        }
      );
    }, 
    (error) => {
      console.log('Transaction error:', error);
    },
    () => {
      console.log('Transaction success');
    });
  });
};

export const getUser = (email, password) => {
  console.log('Loging user:', email, password);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows._array[0]);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};