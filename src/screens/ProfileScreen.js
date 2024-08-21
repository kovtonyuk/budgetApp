import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getUser, getUserId } from '../components/userStore';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState(firstName || '');
  const [lastName, setLastName] = useState(lastName || '');

  useFocusEffect(
    React.useCallback(() => {
      const fetchEmail = async () => {
        const userId = await getUserId();
        if (userId !== null) {
          const users = await getUser();
          const currentUser = users.find(user => user.id === userId);
          if (currentUser) {
            setEmail(currentUser.email);
            setFirstName(currentUser.firstName || '');
            setLastName(currentUser.lastName || '');
          }
        }
      };
      fetchEmail();
    }, [])
  );

  // useEffect(() => {
  //   const fetchEmail = async () => {
  //     const userId = await getUserId();
  //     if (userId !== null) {
  //       const users = await getUser();
  //       const currentUser = users.find(user => user.id === userId);
  //       if (currentUser) {
  //         setEmail(currentUser.email);
  //       }
  //     }
  //   };
  //   fetchEmail();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={require('../assets/img/Avatar.png')} 
          style={styles.avatar} />
      </View>
      <Text style={styles.text}>{email || 'Not provided'}</Text>
      <Text style={styles.text}>{firstName || ''} {lastName || ''}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { firstName, lastName, email })} style={styles.btn}>
        <Image source={require('../assets/img/edit.png')} style={styles.icon} />
        <Text style={styles.btnText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
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
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default ProfileScreen;
