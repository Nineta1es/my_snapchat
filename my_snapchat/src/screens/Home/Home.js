import { Image, StatusBar, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Link } from '@react-navigation/native';

const Home = () => {
  return (
    <View style={styles.Homecontainer}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://www.01net.com/app/uploads/2019/10/Snapchat.jpg',
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={() => console.log('Connexion pressed')}>
          <Link to={'/login'} style={[styles.button, styles.redBackground]}>
            <Text style={styles.buttonText}>CONNEXION</Text>
          </Link>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('Inscription pressed')}>
          <Link to={'/register'} style={[styles.button, styles.blueBackground]}>
            <Text style={styles.buttonText}>INSCRIPTION</Text>
          </Link>
        </TouchableWithoutFeedback>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  Homecontainer: {
    flex: 1,
    backgroundColor: '#fdfc01',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 70,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  redBackground: {
    backgroundColor: '#e82754',
  },
  blueBackground: {
    backgroundColor: '#3cb2e2',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f5f4f1',
  },
});

export default Home;
