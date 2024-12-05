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
            name="WishList"
            component={WishList}
            options={{
              tabBarIcon: ({focused}) => (
                <View>
                  <Icon2
                    name={focused ? 'favorite' : 'favorite-outline'}
                    size={18}
                    color={focused ? '#EB0029' : '#8d92a3'}
                  />
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
