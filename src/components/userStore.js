import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    return users ? JSON.parse(users) : []; // Повертає масив користувачів
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Повертає пустий масив у разі помилки
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const users = await getUser();
    const updatedUsers = users.map(user => {
      if (user.id === updatedUser.id) {
        // Оновлюємо лише ті поля, які вказані
        const updatedUserData = { ...user };
        if (updatedUser.firstName !== undefined) updatedUserData.firstName = updatedUser.firstName;
        if (updatedUser.lastName !== undefined) updatedUserData.lastName = updatedUser.lastName;
        if (updatedUser.email !== undefined) updatedUserData.email = updatedUser.email;
        if (updatedUser.password !== undefined && updatedUser.password !== '') updatedUserData.password = updatedUser.password;
        return updatedUserData;
      }
      return user;
    });
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const users = await getUser();
    // user.id = generateSequentialId; // Додаємо ID новому користувачу
    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const users = await getUser();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject('Invalid email or password');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getEmailById = async (id) => {
  try {
    const users = await getUser();
    const user = users.find(user => user.id === id);
    if (user) {
      return user.email;
    } else {
      return null; // Повертає null, якщо користувача з таким ID не знайдено
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
};

export const saveUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
  } catch (error) {
    console.error('Error saving logged in user ID:', error);
  }
};

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  } catch (error) {
    console.error('Error getting logged in user ID:', error);
    return null;
  }
};