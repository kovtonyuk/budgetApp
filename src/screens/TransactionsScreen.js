import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TransactionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense and Income</Text>
      {/* Компоненти для введення транзакцій */}
      <Button title="Go to Another Screen" onPress={() => navigation.navigate('AnotherScreen')} />
      {/* Інші кнопки для навігації до інших екранів */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TransactionsScreen;