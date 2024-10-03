import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import HomeScreen from '../HomeScreen';
import CartScreen from '../CartScreen';
import ProfileScreen from '../ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={focused ? '#EB0029' : '#8d92a3'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'bag-handle' : 'bag-handle-outline'}
                size={24}
                color={focused ? '#EB0029' : '#8d92a3'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={focused ? '#EB0029' : '#8d92a3'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;
