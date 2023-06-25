import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AuthContext from '../components/AuthContext';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const route = useRoute();
  const { image } = route.params;

  useEffect(() => {
    console.log('Image captured:', image);
    fetchUsers();
  }, [image]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://mysnapchat.epidoc.eu/user', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setUsers(data.data);
        setError(null);
      } else {
        setError(data.data); // Handle the error response
      }
    } catch (error) {
      console.log('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  const sendSnap = async (userId) => {
    if (!image) {
      console.log('Image is not available');
      return;
    }
    var tmp;
    ImgToBase64.base64(image.uri, (err, base64string) => {
      tmp = base64string;
    });
    const snapData = {
      to: userId,
      image: `data:image/png;base64,${tmp}`, // Replace this with the actual base64-encoded image data
      duration: 5,
    };

    try {
      const response = await axios.post('https://mysnapchat.epidoc.eu/user', snapData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Snap sent successfully');
        console.log(image.uri);
      } else {
        console.log('Failed to send snap:', response.status);
        // Handle the failure case as needed
      }
    } catch (error) {
      console.log('Error sending snap:', error);
      // Handle the error case as needed
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.header}>Users:</Text>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          users.map((u) => (
            <Text key={u.id} style={styles.userText} onPress={() => sendSnap(u._id)}>
              {u.username}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfc01',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
    borderRadius: 5,
    width: '100%',
  },
});

export default Users;
