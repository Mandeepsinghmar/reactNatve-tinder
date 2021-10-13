import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

import Card from './screens/Home';
import Profile from './screens/Profile';
import Matches from './screens/Matches';
import Chat from './screens/Chat';
import Login from './screens/Login';
import {
  StateContextProvider,
  useStateContext,
} from './contexts/StateContextProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        options={{headerShown: false}}
        component={Login}
      />
    </Stack.Navigator>
  );
};

const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Matches"
        component={Matches}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: '#F0F2F4',
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: ({color}) => <Icon name="fire" size={30} color={color} />,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({route}) => ({
          title: route.params.matchedUserName,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
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
          tabBarIcon: ({color}) => <Icon name="fire" size={30} color={color} />,
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
          tabBarIcon: ({color}) => <Icon name="user" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const {user} = useStateContext();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = () => {
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <StateContextProvider>
      <Navigation />
    </StateContextProvider>
  );
}
