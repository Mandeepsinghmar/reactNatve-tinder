/* eslint-disable prettier/prettier */

import React, {createContext, useContext, useState, useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [],
      webClientId:
        '855356763463-iqf934irq3qokq1oh44krud61b1345n9.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
// console.log(user);
  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices();
    const profileInfo = await GoogleSignin.signIn();

    const loggedInProfile = {
      name:profileInfo.user.name,
      photo:profileInfo.user.photo,
      lookingFor:'Company',
      title:'Software Engineer',
      id:profileInfo.user.id,
    };
    firestore().collection('profiles').doc(profileInfo.user.uid).set(loggedInProfile);
    setUser(loggedInProfile);

  };
console.log(user);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <StateContext.Provider
      value={{
        user,
        onGoogleButtonPress,
        signOut,

      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
