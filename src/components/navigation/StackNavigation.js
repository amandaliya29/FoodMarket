import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../SignIn';
import TabNavigation from './TabNavigation';
import SignUp from '../SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Address from '../pages/Address';
import FoodDetails from '../pages/FoodDetails';

import CartScreen from '../CartScreen';
import PrivacyPolicyScreen from '../foodMarketScreen/PrivacyPolicyScreen';
import TermsConditionsScreen from '../foodMarketScreen/TermsConditionsScreen';
import InProgressDetail from '../orderListTab/InProgressDetail';
import Help from '../foodMarketScreen/Help';
import AboutUs from '../foodMarketScreen/AboutUs';
import UserProfile from '../pages/UserProfile';
import ForgotPassword from '../ForgotPassword';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await AsyncStorage.getItem('userDetails');
        if (userData) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error reading AsyncStorage data', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'TabNavigation' : 'SignIn'}
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
        <Stack.Screen name="InProgressDetail" component={InProgressDetail} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="Order" component={CartScreen} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen
          name="TermsConditionsScreen"
          component={TermsConditionsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
