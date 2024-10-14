import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import HomeScreen from '../HomeScreen';
import CartScreen from '../CartScreen';
import ProfileScreen from '../ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AddToCart from './AddToCart';
import {useSelector} from 'react-redux';
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
          name="AddToCart"
          component={AddToCart}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name={focused ? 'cart' : 'cart-outline'}
                  size={24}
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

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#EB0029',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TabNavigation;
