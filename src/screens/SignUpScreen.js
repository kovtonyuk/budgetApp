import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, getUser, saveUserId } from '../components/userStore';

// Налаштування Google SignIn
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',
  iosClientId: 'Y799177460164-op1nci6s5aihn0u2n62ttfikcutqktuj.apps.googleusercontent.com',
});

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Отримати останній ID користувача
  const getLastUserId = async () => {
    try {
      const lastId = await AsyncStorage.getItem('lastUserId');
      return lastId ? parseInt(lastId, 10) : 0;
    } catch (error) {
      console.error('Error getting last user ID:', error);
      return 0;
    }
  };

  // Встановити останній ID користувача
  const setLastUserId = async (id) => {
    try {
      await AsyncStorage.setItem('lastUserId', id.toString());
    } catch (error) {
      console.error('Error setting last user ID:', error);
    }
  };

  // Генерація нового ID користувача
  const generateSequentialId = async () => {
    const lastId = await getLastUserId();
    const newId = lastId + 1;
    await setLastUserId(newId);
    return newId;
  };

  // Обробка реєстрації через Google
  const handleGoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google sign-in successful', userInfo);

      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      const newId = await generateSequentialId();
      await addUser({ id: newId, email: user.email, password: '' });
      await saveUserId(newId);
      navigation.navigate('ExpenseIncome');
    } catch (error) {
      console.error('Error handling Google sign up:', error);
    }
  };

  // Валідація форми
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    } else if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Обробка реєстрації користувача
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const users = await getUser();
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
          alert('User already exists');
        } else {
          const newId = await generateSequentialId();
          const newUser = { id: newId, email, password };
          await addUser(newUser);
          await saveUserId(newId);
          alert('User registered successfully!');
          navigation.navigate('Main');
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
      <View style={styles.inputContainer}>
        <Icon name='mail-outline' size={20} color='grey' style={styles.icon} />
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <View style={styles.inputContainer}>
        <Icon name='lock-closed-outline' size={20} color='grey' style={styles.icon} />
        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoComplete="off" // Для Android
          textContentType="none" // Для iOS
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color='grey'
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <View style={styles.inputContainer}>
        <Icon name='lock-closed-outline' size={20} color='grey' style={styles.icon} />
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.errorInput]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          autoComplete="off" // Для Android
          textContentType="none" // Для iOS
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon
            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color='grey'
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDC1CA',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
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
    color: '#6D31ED',
    textAlign: 'center',
  },
});

export default SignUpScreen;
