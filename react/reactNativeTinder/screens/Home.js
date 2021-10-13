/* eslint-disable prettier/prettier */

import React, {useState, useMemo, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {Text, Icon, Image} from 'react-native-elements';
import TinderCard from 'react-tinder-card';
import firestore from '@react-native-firebase/firestore';

import { useAuthContext, useStateContext } from '../contexts/StateContextProvider';

const db = [
  {
    name: 'User1',
    img: 'https://images.pexels.com/photos/6894161/pexels-photo-6894161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'User2',
    img: 'https://images.pexels.com/photos/6894161/pexels-photo-6894161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'User3',
    img: 'https://images.pexels.com/photos/6894161/pexels-photo-6894161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'User4',
    img: 'https://images.pexels.com/photos/6894161/pexels-photo-6894161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'User5',
    img: 'https://images.pexels.com/photos/6894161/pexels-photo-6894161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'User6',
    img: 'https://images.pexels.com/photos/6894161/pexels-photo-6894161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'User7',
    img: 'https://images.pexels.com/photos/6894161/pexels-photo-6894161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];

const Home = () => {
  const alreadyRemoved = [];
  const [lastDirection, setLastDirection] = useState();
const {user} = useStateContext();

const [characters, setCharacters] = useState();

let charactersState = characters;
useEffect(()=>{
  if (user){
    firestore()
    .collection('profiles')
    .onSnapshot(snap => {
      let users = [];
      snap.forEach(doc => {
        const User = doc.data();
          if ( User.id !== user.id ) {
            users.push(doc.data());
          }

      });
      const filtererd = users.filter((item)=> item.title === user.lookingFor);
      setCharacters(filtererd);

    });
  }

},[]);


  const swiped = (direction, nameToDelete, matchedUserId, matchedUserName, matchedUserPhoto) => {
    console.log('removing: ' + nameToDelete + direction );
    if (direction === 'right'){
      firestore().collection('matches').doc(matchedUserId).set({
        currentUserId:user.id,
        matchedUserId,
        matchedUserName,
        matchedUserPhoto,
      });
    }

    setLastDirection(direction);

    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = name => {
    console.log(name + ' left the screen!');
    charactersState = charactersState.filter(
      character => character.name !== name,
    );
    setCharacters(charactersState);
  };

  // const childRefs = useMemo(
  //   () =>
  //     Array(db.length)
  //       .fill(0)
  //       .map(i => React.createRef()),
  //   [],
  // );


  // const swipe = dir => {
  //   const cardsLeft = characters.filter(
  //     person => !alreadyRemoved.includes(person.name),
  //   );
  //   if (cardsLeft.length) {
  //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
  //     const index = db.map(person => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
  //     alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
  //     childRefs[index].current.swipe(dir); // Swipe the card!
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {characters?.map(user => (
          <TinderCard
            key={user.name}
            onSwipe={dir => swiped(dir, user.name, user.id, user.name, user.photo)}
            onCardLeftScreen={() => outOfFrame(user.name)}>
            <View style={styles.card}>
              <ImageBackground
                source={{uri: user.photo}}
                resizeMode="cover"
                style={styles.cardImage}>
                <Text style={styles.cardTitle}>{user.name}</Text>
              </ImageBackground>
            </View>
          </TinderCard>
        ))}
      </View>

      <View style={styles.icons}>
        <View>
          <TouchableOpacity>
            <Icon
              reverse
              name="times"
              type="font-awesome"
              color="#ff006f"
              onPress={() => console('left')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Icon
              reverse
              name="heart"
              type="font-awesome"
              color="#00ffa6"
              onPress={() => console('right')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    height: 450,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: 450,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    resizeMode: 'cover',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000',
    width: '100%',
  },
});

export default Home;
