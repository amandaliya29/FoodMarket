import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import HomeScreen from '../HomeScreen';
import CartScreen from '../CartScreen';
import ProfileScreen from '../ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AddToCart from './AddToCart';
import {useSelector} from 'react-redux';
import WishList from '../WishList';
import Search from '../Search';
import {KeyboardAvoidingView} from 'react-native';
import OfferPage from '../pages/OfferPage';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
              marginTop: -5,
              marginBottom: 5,
              fontSize: 12,
            },
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: '#EB0029',
            tabBarStyle: {backgroundColor: '#fff'},
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon
                  name={focused ? 'home' : 'home-outline'}
                  size={18}
                  color={focused ? '#EB0029' : '#8d92a3'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Offer"
            component={OfferPage}
            options={{
              tabBarIcon: ({focused}) => (
                <View>
                  <Icon3
                    name={focused ? 'offer' : 'offer'}
                    size={20}
                    color={focused ? '#EB0029' : '#8d92a3'}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon2
                  name={focused ? 'search' : 'search'}
                  size={18}
                  color={focused ? '#EB0029' : '#8d92a3'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={AddToCart}
            options={{
              tabBarIcon: ({focused}) => (
                <View>
                  <Icon
                    name={focused ? 'cart' : 'cart-outline'}
                    size={18}
                    color={focused ? '#EB0029' : '#8d92a3'}
                  />
                  {cartItemCount > 0 && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{cartItemCount}</Text>
                    </View>
                  )}
                </View>
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
                  size={18}
                  color={focused ? '#EB0029' : '#8d92a3'}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -4,
    backgroundColor: '#EB0029',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  badgeText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default TabNavigation;
