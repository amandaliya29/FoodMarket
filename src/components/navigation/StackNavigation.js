import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from '../SignIn';
import TabNavigation from './TabNavigation';
import SignUp from '../SignUp';
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
import AdminHomeScreen from '../adminScreen/AdminHomeScreen';
import CategoriesDetail from '../pages/CategoriesDetail';
import WishList from '../WishList';
import AdminOrderDetail from '../adminScreen/AdminOrderDetail';
import AdminSetProfile from '../adminScreen/AdminSetProfile';
import Search from '../Search';
import AdminSearch from '../adminScreen/AdminSearch';
import AdminAddCategory from '../adminScreen/addItemAdminTab/AdminAddCategory';
import AdminAddProduct from '../adminScreen/addItemAdminTab/AdminAddProduct';
import AdminDetail from '../adminScreen/AdminDetail';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const determineInitialRoute = async () => {
      try {
        const userData = await AsyncStorage.getItem('userDetails');
        const parsedUserData = userData ? JSON.parse(userData) : null;
        if (parsedUserData) {
          const isAdmin = parsedUserData.data.user.is_admin === 1;
          setInitialRoute(isAdmin ? 'AdminHomeScreen' : 'TabNavigation');
        } else {
          setInitialRoute('SignIn');
        }
      } catch (error) {
        console.error('Error reading AsyncStorage data', error);
        setInitialRoute('SignIn');
      }
    };

    determineInitialRoute();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          statusBarColor: 'white',
          statusBarStyle: 'dark',
          contentStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
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
        <Stack.Screen name="CategoriesDetail" component={CategoriesDetail} />
        <Stack.Screen name="WishList" component={WishList} />
        <Stack.Screen name="AdminOrderDetail" component={AdminOrderDetail} />
        <Stack.Screen name="AdminSetProfile" component={AdminSetProfile} />
        <Stack.Screen name="AdminSearch" component={AdminSearch} />
        <Stack.Screen name="AdminAddCategory" component={AdminAddCategory} />
        <Stack.Screen name="AdminAddProduct" component={AdminAddProduct} />
        <Stack.Screen name="AdminDetail" component={AdminDetail} />
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
