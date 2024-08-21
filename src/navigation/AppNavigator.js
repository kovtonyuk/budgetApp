import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';
import TagScreen from '../screens/TagScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{
          headerLeft: () => null, // Сховати кнопку зліва на екрані SignIn
        }} 
      />
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{
          headerLeft: () => null, // Сховати кнопку зліва на екрані SignIn
        }} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          headerLeft: () => null, // Сховати кнопку зліва на екрані SignIn
        }} 
      />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }} // Приховати заголовок на головному екрані
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#6D31ED',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Transactions') {
            iconName = 'cash-outline';
          } else if (route.name === 'Profile') {
            iconName = 'people-circle-outline';
          } else if (route.name === 'Categories') {
            iconName = 'list-outline';
          } else if (route.name === 'Tags') {
            iconName = 'bookmark-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Transactions" component={TransactionsScreen} />      
      <Tab.Screen name="Categories" component={CategoryScreen} />
      <Tab.Screen name="Tags" component={TagScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
