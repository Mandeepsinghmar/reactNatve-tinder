/* eslint-disable prettier/prettier */

import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Image} from 'react-native-elements';
import ChatBox from './ChatBox';

const image = {
    uri: 'https://pbs.twimg.com/profile_images/1413842531507261447/PVxdFfj9_400x400.jpg',
  };

const Chat = () => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.searchMatches}
        placeholder="Search 0 Matches"
        leftIcon={<Icon name="search" size={14} color="gray" />}
        onChangeText={value =>console.log(value)}
      />
      <Text style={styles.heading}>New Matches</Text>
      <View style={styles.newMatches}>
      <Image source={image} PlaceholderContent={<ActivityIndicator />} style={styles.userImage}/>
      <Text style={styles.userName}>Mandeep singhmar</Text>
      </View>
      <Text style={styles.heading}>Messages</Text>
<View style={styles.messages} >
      <Image source={image} PlaceholderContent={<ActivityIndicator />} style={styles.messageUserImage}/>
      <View style={styles.message}>
      <Text style={styles.messageUserName}>Mandeep singhmar</Text>
      <Text style={styles.messageDesc}>Hey, how's going?</Text>
      </View>

</View>
<ChatBox />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#fff',
        width:'100%',
        height:'100%',
    },
  searchMatches: {
    fontSize: 14,
    padding:5,
  },
  heading:{
      color:'tomato',
      fontWeight:'600',
      padding:10,
  },
  newMatches:{
     maxWidth:100,
     marginTop:10,
     display:'flex',
     alignItems:'center',
  },
  userImage:{
    borderRadius:10,
    width:70,
    height:100,
},
userName:{
    fontWeight:'bold',
    fontSize:10,
    width:80,
   textAlign:'center',
},
messages:{
    display:'flex',
    flexDirection:'row',
   alignItems:'center',
   padding:10,
   paddingLeft:15,
   borderBottomWidth:1,
   borderBottomColor:'#F0F2F4',
},
messageUserImage:{
    borderRadius:50,
    width:50,
    height:50,
},
message:{
    paddingLeft:15,

},
messageUserName:{
    fontWeight:'500',
    fontSize:14,
   textAlign:'center',
},
messageDesc:{
    fontSize:13,
},

});
