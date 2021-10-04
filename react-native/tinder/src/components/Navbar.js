/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Navbar = () => {
  return (
    <View style={styles.logo}>
      <Icon name="fire" color="tomato" size={25} />
      <Text style={styles.logoText}>tinder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    display: 'flex',
    flexDirection:'row',
    padding:10,
    paddingLeft:20,
    backgroundColor:'#fff',
  },
  logoText:{
      fontSize:20,
      color:'tomato',
      fontWeight:'bold',
  },
});
