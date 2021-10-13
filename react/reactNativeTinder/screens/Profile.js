/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Image, Icon} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useStateContext } from '../contexts/StateContextProvider';

const Profile = () => {
  const {user, signOut} = useStateContext();
  // const [user, setUser] = useState();
  // const [gender, setGender] = useState('Male');

  // useEffect(() => {
  //   if (!user) {
  //     const getCurrentUser = async () => {
  //       const currentUser = await GoogleSignin.getCurrentUser();
  //       setUser(currentUser);
  //     };
  //     getCurrentUser();
  //   }
  // }, []);

  return (
    <>
      {user && (
        <View style={styles.container}>
          <View style={styles.userInfoContainer}>
            <Image
              source={{uri: user.photo}}
              PlaceholderContent={<ActivityIndicator />}
              style={styles.userImage}
            />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userBio}>{user.title}</Text>
          </View>
          <Picker
            selectedValue="Male"
            style={{height: 50, width: 150}}
            // onValueChange={itemValue => setGender(itemValue)}
            >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <View style={styles.iconsContainer}>
            <Icon
              raised
              name="cog"
              type="font-awesome"
              color="#f50"
              onPress={() => console.log('hello')}
            />
            <Icon
              raised
              name="sign-out"
              type="font-awesome"
              color="#f50"
              onPress={signOut}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    padding: 29,
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userImage: {
    borderRadius: 60,
    width: 120,
    height: 120,
  },
  userName: {
    fontWeight: '500',
    fontSize: 20,
  },
  userBio: {
    fontSize: 15,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
});
