import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { BudgetContext } from '../context/BudgetContext';

const TransactionForm = ({ categoryId }) => {
  const [amount, setAmount] = useState('');
  const { addTransaction } = useContext(BudgetContext);

  const handleSubmit = () => {
    addTransaction(categoryId, parseFloat(amount));
    setAmount('');
  };

  return (
    <View>
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Button title="Add Transaction" onPress={handleSubmit} />
    </View>
  );
};

export default TransactionForm;
