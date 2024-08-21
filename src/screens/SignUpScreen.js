import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { addUser, getUser } from '../components/userStore';
import { nanoid } from 'nanoid';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // Замініть на ваш webClientId з Google Cloud Console
  iosClientId: 'Y799177460164-op1nci6s5aihn0u2n62ttfikcutqktuj.apps.googleusercontent.com',
});

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleGoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google sign-in successful', userInfo);

      // Використовуйте idToken для авторизації в Firebase, якщо потрібно
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      await addUser({ id: nanoid(), email: user.email, password: '' }); // Додайте інші дані користувача тут
      navigation.navigate('ExpenseIncome');
    } catch (error) {
      console.error('Error handling Google sign up:', error);
    }
  };

  const validateForm = () => {
    let valid = true;
    let errorMessages = { email: '', password: '', confirmPassword: '' };
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errorMessages.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      errorMessages.email = 'Invalid email format';
      valid = false;
    }
  
    if (!password) {
      errorMessages.password = 'Password is required';
      valid = false;
    }
  
    if (password !== confirmPassword) {
      errorMessages.confirmPassword = 'Passwords do not match';
      valid = false;
    }
  
    if (!confirmPassword) {
      errorMessages.confirmPassword = 'Please confirm your password';
      valid = false;
    }
  
    setErrors(errorMessages);
    return valid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const users = await getUser();
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
          alert('User already exists');
        } else {
          await addUser({ id: nanoid(), email, password });
          console.log({ id: nanoid(), email, password });
          alert('User registered successfully!');
          navigation.navigate('Main'); // Перехід на екран входу після успішної реєстрації
        }
      } catch (error) {
        console.error('Error handling sign up:', error);
        alert('An error occurred while signing up.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.subTitle}>Create an account</Text>
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.errorInput]}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
        <Image source={require('../assets/img/google.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 10,
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 16,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    fontSize: 14,
    color: '#000',
  },
  link: {
    marginTop: 14,
    color: 'black',
    textAlign: 'center',
  },
});

export default SignUpScreen;
