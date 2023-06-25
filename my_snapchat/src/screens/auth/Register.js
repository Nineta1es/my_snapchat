import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

export default function Register() {
  const [psw, setPass] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (send) {
      fetch('https://mysnapchat.epidoc.eu/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: user,
          password: psw,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            setError('Compte créé avec succès');
          } else if (response.status === 400) {
            setError('Adresse mail déjà utilisée');
          } else {
            setError('Erreur inconnue');
          }
          setSend(false);
        })
        .catch((error) => {
          setError('Erreur de réseau');
          setSend(false);
        });
    }
  }, [send]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vous n'avez pas encore de compte? Inscrivez-vous! </Text>
      <TextInput style={styles.input} onChangeText={setUser} value={user} placeholder="Username" />
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        value={psw}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => setSend(true)}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link to={'/home'} style={styles.buttonText}>
          Retour
        </Link>
      </TouchableOpacity>

      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfc01',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4caf50',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 18,
  },
  errorText: {
    marginTop: 15,
    color: 'red',
    textAlign: 'center',
  },
});
