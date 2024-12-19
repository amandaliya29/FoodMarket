import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdminTabScreen from './AdminTabScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AddItemScreen from './AddItemScreen';
import AdminProfile from './AdminProfile';

const AdminHomeScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{flex: 1}}>
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
            component={AdminTabScreen}
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
            name="Add"
            component={AddItemScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon
                  name={focused ? 'add' : 'add-outline'}
                  size={18}
                  color={focused ? '#EB0029' : '#8d92a3'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={AdminProfile}
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
    </View>
  );
};

export default AdminHomeScreen;

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
