import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BudgetContext } from '../context/BudgetContext';

const SettingsScreen = ({ navigation }) => {
  const { setUser } = useContext(BudgetContext);

  const handleLogout = () => {
    if (setUser) {
      setUser(null); // Очистити користувача з контексту
      navigation.navigate('SignIn'); // Перейти на екран входу
    } else {
      console.error('setUser не доступний');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
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

export default SettingsScreen;