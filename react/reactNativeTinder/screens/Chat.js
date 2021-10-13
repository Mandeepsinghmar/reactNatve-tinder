/* eslint-disable prettier/prettier */


import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import { useStateContext } from '../contexts/StateContextProvider';

const Chat = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const {user} = useStateContext();
const { matchedUserName, matchedUserId, matchedUserPhoto} = route.params;


  useEffect(() => {
    if (user) {
      firestore().collection('chats')
        .where('currentUserId', 'in', [user.id, matchedUserId])
        .orderBy('createdAt', 'asc')
        .onSnapshot((snap) => {
          const documents = [];
          console.log(snap);
          if (snap !== null){
            snap.forEach((doc) => {
              let data = doc.data();

              if (
                (data.currentUserId === user.id &&
                  data.matchedUserId === matchedUserId) ||
                (data.currentUserId === matchedUserId &&
                  data.matchedUserId === user.id)
              ) {
                documents.push(doc.data());
              }
            });
            setMessages(documents);
            console.log(documents);
          }


        });
    }
  }, []);

  // useEffect(() => {
  //   // getAllMessages()

  //        const docid  = matchedUserId > user.id ? user.id + '-' + matchedUserId : matchedUserId + '-' + user.id;

  //     const messageRef = firestore().collection('chatrooms')
  //     .doc(docid)
  //     .collection('messages')
  //     .orderBy('createdAt','desc');

  //   const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
  //         const allmsg =   querySnap.docs.map(docSanp=>{
  //          const data = docSanp.data();
  //          if (data.createdAt){
  //              return {
  //                 ...docSanp.data(),
  //                 createdAt:docSanp.data().createdAt.toDate(),
  //             };
  //          } else {
  //             return {
  //                 ...docSanp.data(),
  //                 createdAt:new Date(),
  //             };
  //          }

  //         });
  //         setMessages(allmsg);
  //     });


  //     return ()=>{
  //       unSubscribe();
  //     };


  //   }, []);

  const onSend = (messageArray) => {
    const msg = messageArray[0];
    const mymsg = {
      sentBy: user.id,
       text:msg,
      createdAt: new Date(),
      sentTo:matchedUserId,

    };

      setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
      const docid  = matchedUserId > user.id ? user.id + '-' + matchedUserId : matchedUserId + '-' + user.id;

      firestore().collection('chats')
      .doc(docid)
      // .collection('messages')
      .set(mymsg);
  },

       renderSend = props => {
    return (
      <Send {...props}>
        <View
style={styles.sendButton}
        >
        <Icon
              name="paper-plane"
              type="font-awesome"
              color="#000"
            />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
            borderRadius:5,
          },
          left:{
            backgroundColor: '#e5e5e5',
            borderRadius:5,
          },
        }}

        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#000',
          },
        }}

      />
    );
  };

  const scrollToBottomComponent = () => {
    return <Icon name="angle-double-down" type="font-awesome" color="#e5e5e5" />;
  };
  return (
    <View
    style={styles.container}

    >
  <GiftedChat
      messages={messages}
      // text={message}
      // onInputTextChanged={text => setMessage(text)}
      onSend={text => onSend(text)}
      user={{
        _id: user.id,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
    </View>

  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  sendButton:{
    marginBottom:10,
    marginRight:10,
  },
});
