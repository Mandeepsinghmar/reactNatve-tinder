/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Image} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import {useStateContext} from '../contexts/StateContextProvider';
const image = {
  uri: 'https://pbs.twimg.com/profile_images/1413842531507261447/PVxdFfj9_400x400.jpg',
};
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];
const Matches = ({navigation}) => {
  const {user} = useStateContext();
  const [matches, setMatches] = useState();
  useEffect(() => {
    if (user) {
      firestore()
        .collection('matches')
        .onSnapshot(snap => {
          let matchedProfiles = [];
          snap.forEach(doc => {
            const User = doc.data();
            if (User.currentUserId === user.id) {
              matchedProfiles.push(doc.data());
            }
          });
          setMatches(matchedProfiles);

          // const filtererd = matches.filter((item)=> item.id === user.id);
          // console.log(filtererd);
        });
    }
  }, []);
  console.log(navigation);
  return (
    <View style={styles.container}>
      <Input
        style={styles.searchMatches}
        placeholder="Search 0 Matches"
        leftIcon={<Icon name="search" size={14} color="gray" />}
        onChangeText={value => console.log(value)}
      />
      <Text style={styles.heading}>New Matches</Text>
      <View style={styles.matchesContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.matchesContainer}>
        {matches?.map(match => (
          <View style={styles.newMatches}  >
            <Image

              source={{uri: match.matchedUserPhoto}}
              PlaceholderContent={<ActivityIndicator />}
              style={styles.userImage}
              onPress={()=> navigation.navigate('Chat',{matchedUserName:match.matchedUserName, matchedUserId:match.MatchedUserId, matchedUserPhoto:match.matchedUserPhoto})}
            />
            <Text style={styles.userName}>{match.matchedUserName}</Text>
          </View>
        ))}

        {matches?.map(match => (
          <View style={styles.newMatches}>
            <Image
              source={{uri: match.matchedUserPhoto}}
              PlaceholderContent={<ActivityIndicator />}
              style={styles.userImage}
            />
            <Text style={styles.userName}>{match.matchedUserName}</Text>
          </View>
        ))}
      </ScrollView>

      </View>

      <Text style={styles.heading}>Messages</Text>
      <View style={styles.messagesContainer}>
      <FlatList
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <View  style={styles.messages} >
                <Image
          source={image}
          PlaceholderContent={<ActivityIndicator />}
          style={styles.messageUserImage}
          onPress={() => navigation.navigate('Chat', {matchedUserName: item.userName })}
        />
        <View style={styles.message}
        >
          <Text style={styles.messageUserName}
          onPress={() => navigation.navigate('Chat', {matchedUserName: item.userName})}

          >{item.userName}</Text>
          <Text style={styles.messageDesc}
          onPress={() => navigation.navigate('Chat', {matchedUserName: item.userName})}

          >{item.messageText}</Text>
        </View>
            </View>
          )}
        />

      </View>
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    width: '100%',
    height:'100%',
  },
  searchMatches: {
    fontSize: 14,
    padding: 5,
  },
  heading: {
    color: 'tomato',
    fontWeight: '600',
    padding: 10,
  },
  matchesContainer: {
    height: 150,
  },
  newMatches: {
    maxWidth: 100,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  userImage: {
    borderRadius: 10,
    width: 70,
    height: 100,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 10,
    width: 80,
    textAlign: 'center',
  },
  messagesContainer:{
overflow:'scroll',
  },
  messages: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F4',
  },
  messageUserImage: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  message: {
    paddingLeft: 15,
  },
  messageUserName: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
  messageDesc: {
    fontSize: 13,
  },
});
