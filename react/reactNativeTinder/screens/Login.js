/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStateContext } from '../contexts/StateContextProvider';

const Login = () => {
  const {onGoogleButtonPress} = useStateContext();

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Icon name="fire" color="tomato" size={100} />
        <Text style={styles.logoText}>tinder</Text>
      </View>
      <GoogleSigninButton
        style={styles.googleSigninButton}
        onPress={onGoogleButtonPress}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 80,
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  logoText: {
    fontSize: 70,
    color: 'tomato',
    fontWeight: 'bold',
  },
  googleSigninButton: {
    cursor: 'pointer',
    width: 240,
    height: 50,
    fontSize: 50,
  },
});
