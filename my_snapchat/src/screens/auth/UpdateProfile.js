import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../components/AuthContext';

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const handleUpdate = () => {
    fetch('https://mysnapchat.epidoc.eu/user', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: newPassword,
      }),
    })
      .then((response) => {
        if (response.headers.get('Content-Type').includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Unexpected response from server');
        }
      })
      .then((data) => {
        if (data.success) {
          console.log('Profile updated successfully');
          setUpdateMessage('Profil mis à jour avec succès');
          setUser({
            ...user,
            email: email,
            username: username,
          });
        } else {
          console.log('Failed to update profile:', data.data);
        }
      })
      .catch((error) => console.log('Network error:', error));
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      <Text>New Password</Text>
      <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry />
      {updateMessage ? <Text>{updateMessage}</Text> : null}
      <Button title="Update Profile" onPress={handleUpdate} />
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('camera')}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdateProfile;
