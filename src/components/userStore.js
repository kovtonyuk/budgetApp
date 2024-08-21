let users = [];

export const getUser = async () => {
  try {
    return Promise.resolve(users); // Повертає масив користувачів
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Повертає пустий масив у разі помилки
  }
};

export const getUserEmail = async () => {
  try {
    console.log(users);
    // Замініть 'users' на URL вашого API або локального сховища
    const response = await fetch(users);
    const users = await response.json(); // Отримання масиву користувачів
    return users; // Повернення масиву
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Повертає пустий масив у разі помилки
  }
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