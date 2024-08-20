let users = [];

export const getUser = () => {
  return Promise.resolve(users);
};

export const addUser = (user) => {
  users.push(user);
  return Promise.resolve();
};

export const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    getUser().then(users => {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        resolve(user);
      } else {
        reject('Invalid email or password');
      }
    }).catch(error => reject(error));
  });
};