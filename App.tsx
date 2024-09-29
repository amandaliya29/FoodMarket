import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import HomeScreen from './src/components/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CartScreen from './src/components/CartScreen';
import ProfileScreen from './src/components/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* StatusBar configuration */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, // Hide labels if desired
          tabBarStyle: {backgroundColor: '#fff'}, // Custom Tab Bar styling
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
    </NavigationContainer>
  );
};

export default App;
