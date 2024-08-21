import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';

export const getUser = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    return users ? JSON.parse(users) : []; // Повертає масив користувачів
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Повертає пустий масив у разі помилки
  }
};

export const updateUser = async (email, updates) => {
  try {
    const users = await getUser();
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        return { ...user, ...updates }; // Оновлюємо дані користувача
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
    user.id = nanoid(); // Додаємо ID новому користувачу
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
