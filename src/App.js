import React, { useEffect } from 'react';
import { BudgetProvider } from './context/BudgetContext'; 
import AppNavigator from './navigation/AppNavigator'; 
import { initDB } from '../database'; // Імплементуйте правильний шлях

const App = () => {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <BudgetProvider>
      <AppNavigator />
    </BudgetProvider>
  );
};

export default App;