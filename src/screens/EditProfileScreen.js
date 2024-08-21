import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { updateUser } from '../components/userStore';

const EditProfileScreen = ({ route, navigation }) => {
  const { id: initialId, firstName: initialFirstName, lastName: initialLastName, email: initialEmail } = route.params || {};

  const [firstName, setFirstName] = useState(initialFirstName || '');
  const [lastName, setLastName] = useState(initialLastName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(initialEmail || '');
    setFirstName(initialFirstName || '');
    setLastName(initialLastName || '');
  }, [initialEmail, initialFirstName, initialLastName]);

  const handleSave = async () => {
    const updatedUser = {
      id: initialId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password || undefined, // Якщо пароль порожній, не оновлюємо його
    };
    
    await updateUser(updatedUser);
    console.log('User updated');
    navigation.navigate('Profile', {
      email: email,
      firstName: firstName,
      lastName: lastName,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="off"
        textContentType="none"
      />
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
