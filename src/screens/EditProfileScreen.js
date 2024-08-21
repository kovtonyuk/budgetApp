import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const EditProfileScreen = ({ route, navigation }) => {
  // Отримання параметрів навігації (можуть бути передані при переході з екрану профілю)
  const { firstName: initialFirstName, lastName: initialLastName } = route.params || {};

  const [firstName, setFirstName] = useState(initialFirstName || '');
  const [lastName, setLastName] = useState(initialLastName || '');

  useEffect(() => {
    // Оновлюємо стан, якщо параметри навігації змінюються
    setFirstName(initialFirstName || '');
    setLastName(initialLastName || '');
  }, [initialFirstName, initialLastName]);

  const handleSave = () => {
    // Передаємо дані на екран профілю через параметри навігації
    navigation.navigate('Profile', {
      firstName: firstName,
      lastName: lastName,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 10,
    width: '100%',
  },
  btn: {
    backgroundColor: '#6D31ED',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default EditProfileScreen;
