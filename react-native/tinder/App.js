import 'react-native-gesture-handler';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './src/components/Card';
import {Navbar} from './src/components/Navbar';
import Profile from './src/components/Profile';
import Chat from './src/components/Chat';
import ChatBox from './src/components/ChatBox';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // creates object for Stack Navigator

const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: '#F0F2F4',
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: ({color}) => <Icon name="fire" size={30} color={color} />,
        }}
      />
      <Stack.Screen name="ChatBox" component={ChatBox} />
    </Stack.Navigator>
  );
};
function MyTabs() {
  return (
    <>
      <Navbar />
      <Tab.Navigator initialRouteName="Feed">
        <Tab.Screen
          name="Feed"
          component={Card}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: '#F0F2F4',
            tabBarButton: props => <TouchableOpacity {...props} />,
            tabBarIcon: ({color}) => (
              <Icon name="fire" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatNavigator}
          options={{
            headerShown: false,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: '#F0F2F4',
            tabBarShowLabel: false,
            tabBarButton: props => <TouchableOpacity {...props} />,
            tabBarIcon: ({color}) => (
              <Icon name="comments" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: '#F0F2F4',
            tabBarShowLabel: false,
            tabBarButton: props => <TouchableOpacity {...props} />,
            tabBarIcon: ({color}) => (
              <Icon name="user" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
