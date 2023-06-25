import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContextProvider } from './src/components/AuthContext';

import Home from './src/screens/Home/Home';
import Register from './src/screens/auth/Register';
import Login from './src/screens/auth/Login';
import Profile from './src/screens/auth/Profile';
import camera from './src/screens/camera';
import users from './src/screens/Users';
import UpdateProfile from './src/screens/auth/UpdateProfile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeActivity" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="camera" component={camera} />
          <Stack.Screen name="users" component={users} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
