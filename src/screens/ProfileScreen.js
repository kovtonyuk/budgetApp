import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  // Отримання параметрів навігації
  const { firstName, lastName } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={require('../assets/img/Avatar.png')} 
          style={styles.avatar} />
      </View>
      <Text style={styles.text}>{firstName || 'Not provided'} {lastName || 'Not provided'}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { firstName, lastName })} style={styles.btn}>
        <Image source={require('../assets/img/edit.png')} style={styles.icon} />
        <Text style={styles.btnText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
    padding: 17,
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center', // Центрує аватарку всередині контейнера
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#6D31ED',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  icon: {
    marginRight: 10,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
  },
  avatar: {
    width: 80, // Збільшено для кращої видимості
    height: 80, // Збільшено для кращої видимості
    borderRadius: 40, // Становить коло
  },
});

export default ProfileScreen;
