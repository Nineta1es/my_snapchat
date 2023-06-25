import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, Link } from '@react-navigation/native';
import AuthContext from '../../components/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [send, setSend] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const handleLogin = () => {
    if (!email) {
      setError('Veuillez entrer un email');
    } else if (!password) {
      setError('Veuillez entrer un mot de passe');
    } else {
      setSend(true);
    }
  };

  useEffect(() => {
    if (send) {
      fetch('https://mysnapchat.epidoc.eu/user', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            console.log('Email ou mot de passe incorrect');
            setError('Email ou mot de passe incorrect');
          } else {
            setError('Une erreur est survenue');
          }
          setSend(false);
        })
        .then((data) => {
          if (data) {
            setUser(data.data);
            navigation.navigate('camera');
          }
        })
        .catch((error) => {
          console.error(error);
          setSend(false);
        });
    }
  }, [send, navigation, email, password, setUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veuillez entrer votre e-mail et mot de passe</Text>

      <TextInput
        style={[styles.input, styles.inputWithBorder]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, styles.inputWithBorder]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Retour</Text>
        </View>
      </TouchableWithoutFeedback>

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfc01',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  inputWithBorder: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 15,
  },
});
