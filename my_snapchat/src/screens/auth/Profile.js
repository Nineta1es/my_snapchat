import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../components/AuthContext';

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (deleteAccount) {
      fetch('https://mysnapchat.epidoc.eu/user', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Compte supprimé avec succès');
            logout();
            navigation.navigate('home');
          } else if (response.headers.get('Content-Type').includes('application/json')) {
            console.log('Failed to delete account:', response.status);
            return response.json();
          } else {
            throw new Error('Unexpected response from server');
          }
        })
        .then((responseJson) => {
          if (responseJson) {
            console.log('Error message:', responseJson);
            setDeleteError(responseJson.message);
          }
        })
        .catch((error) => {
          console.log('Network error:', error);
          setDeleteError('Erreur de réseau');
        });
      setDeleteAccount(false);
    }
  }, [deleteAccount]);

  const handleUpdate = () => {
    navigation.navigate('UpdateProfile');
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('home');
  };

  const handleDeleteAccount = () => {
    console.log('Delete Account button pressed');
    setDeleteAccount(true);
  };

  const handleGoBack = () => {
    navigation.navigate('camera');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user ? user.username : ''}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user ? user.email : ''}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{user ? user._id : ''}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignSelf: 'center',
  },
  logoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignSelf: 'center',
  },
  deleteAccountButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  goBackButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: 100,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileInfo: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
});

export default Profile;
