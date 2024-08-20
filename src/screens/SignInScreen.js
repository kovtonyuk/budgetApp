import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getUser } from '../../database'; // Імплементуйте правильний шлях

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // Замініть на ваш webClientId з Google Cloud Console
  iosClientId: 'Y799177460164-op1nci6s5aihn0u2n62ttfikcutqktuj.apps.googleusercontent.com',
});

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Додано confirmPassword
  const [errors, setErrors] = useState({}); // Використання errors замість error

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Успішна реєстрація через Google', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Відміна реєстрації через Google');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Реєстрація вже виконується');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services недоступний');
      } else {
        console.log('Інша помилка при реєстрації через Google', error);
      }
    }
  };

  const handleSignIn = async () => {
    let valid = true;
    let errorMessages = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    
    // Перевірка на формат електронної пошти
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errorMessages.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      errorMessages.email = 'Invalid email format';
      valid = false;
    }

    // Перевірка на наявність пароля
    if (!password) {
      errorMessages.password = 'Password is required';
      valid = false;
    }

    if (valid) {
      // Перевірка на існування користувача
      try {
        const user = await getUser(email, password);
        if (user) {
          console.log('User found:', user);
          // Перехід на наступний екран або інша дія після успішного входу
          navigation.navigate('Transactions');
        } else {
          console.log('User not found');
          alert('Invalid email or password');
        }
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Failed to sign in.');
      }
    } else {
      setErrors(errorMessages);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>
      <Text style={styles.subTitle}>Enter your credentials or continue with Google</Text>
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
        autoComplete="off" // Вимкнення автозаповнення
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={[styles.link, styles.forgot]}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Image source={require('../assets/img/google.png')} 
          style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don’t have an account? Sign up</Text>
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
    fontWeight: '400', // Змініть на числову вагу
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400', // Змініть на числову вагу
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
    color: '#ccc',
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
    fontFamily: 'Manrope-Regular',
    fontWeight: '400', // Змініть на числову вагу
    color: '#000',
  },
  link: {
    marginTop: 14,
    color: '#6D31ED',
    textAlign: 'center',
  },
  forgot: {
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'right',
  },
});

export default SignInScreen;