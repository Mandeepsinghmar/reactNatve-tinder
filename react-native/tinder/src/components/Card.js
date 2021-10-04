/* eslint-disable prettier/prettier */

import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text, Icon } from 'react-native-elements';

const image = {uri: 'https://pbs.twimg.com/profile_images/1413842531507261447/PVxdFfj9_400x400.jpg'};

const Card = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <View style={styles.profileInfo}>
            <Text h3 style={styles.text}>Mandeep</Text>
      <Text h5 style={styles.description}>Software Engineer</Text>
            </View>

    </ImageBackground>
    <View style={styles.icons}>
    <View>
    <TouchableOpacity>
    <Icon
         reverse
          name="times"
          type="font-awesome"
          color="#ff006f"
          onPress={() => console.log('hello')} />
    </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity>
    <Icon
          reverse
          name="heart"
          type="font-awesome"
          color="#00ffa6"
          onPress={() => console.log('hello')} />
    </TouchableOpacity>
    </View>

    </View>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  profileInfo:{
      marginLeft:20,
      marginBottom:20,
  },
  text: {
    color: 'white',
    fontSize: 30,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  description: {
      fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  icons:{
      display:'flex',
      justifyContent:'center',
      flexDirection:'row',
      backgroundColor:'#000',
  },
});

export default Card;
