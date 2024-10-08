import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../SignIn';
import TabNavigation from './TabNavigation';
import SignUp from '../SignUp';
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens';
import Address from '../pages/Address';
import FoodDetails from '../pages/FoodDetails';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
          statusBarColor: 'white',
          statusBarStyle: 'dark',
          contentStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="FoodDetail" component={FoodDetails} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
