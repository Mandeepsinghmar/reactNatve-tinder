/* eslint-disable prettier/prettier */

import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';

const image = {
  uri: 'https://pbs.twimg.com/profile_images/1413842531507261447/PVxdFfj9_400x400.jpg',
};

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={image} PlaceholderContent={<ActivityIndicator />} style={styles.userImage}/>
      <Text style={styles.userName}>Mandeep singhmar, 21</Text>
      <Text style={styles.userBio}>Software Engineer</Text>

    </View>
  );
};

export default Profile;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    padding:29,
    backgroundColor:'#fff',
    },
    userImage:{
        borderRadius:50,
        width:100,
        height:100,
    },
    userName:{
        fontWeight:'500',
        fontSize:20,
    },
    userBio:{
        fontSize:15,
    },
});
