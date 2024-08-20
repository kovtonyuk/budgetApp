import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { BudgetContext } from '../context/BudgetContext';

const TransactionList = ({ categoryId }) => {
  const { transactions } = useContext(BudgetContext);

  return (
    <View>
      {transactions
        .filter((transaction) => transaction.categoryId === categoryId)
        .map((transaction) => (
          <Text key={transaction.id}>{transaction.amount}</Text>
        ))}
    </View>
  );
};

export default TransactionList;
