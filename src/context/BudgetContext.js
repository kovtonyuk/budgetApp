import React, { createContext, useState } from 'react';

// Створення контексту
export const BudgetContext = createContext();

// Провайдер контексту
export const BudgetProvider = ({ children }) => {
  // Стан для категорій
  const [categories, setCategories] = useState([]);
  
  // Стан для транзакцій
  const [transactions, setTransactions] = useState([]);
  
  // Стан для користувача
  const [user, setUser] = useState(null);

  // Функція для додавання категорії
  const addCategory = (name) => {
    setCategories([...categories, { name, id: Date.now() }]);
  };

  // Функція для додавання транзакції
  const addTransaction = (categoryId, amount) => {
    setTransactions([...transactions, { categoryId, amount, id: Date.now() }]);
  };

  return (
    <BudgetContext.Provider value={{ 
      categories, 
      transactions, 
      addCategory, 
      addTransaction, 
      user, 
      setUser 
    }}>
      {children}
    </BudgetContext.Provider>
  );
};
