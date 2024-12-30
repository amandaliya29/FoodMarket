import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../axios/axiosInstance';

const Account = () => {
  const navigation = useNavigation();

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get('/logout');
      if (response.status === 200) {
        await AsyncStorage.removeItem('userDetails');
        showToastWithGravityAndOffset(response.data.message);
        navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
      }
    } catch (error) {
      if (error.response) {
        showToastWithGravityAndOffset(error.response.data.message);
      } else if (error.request) {
        showToastWithGravityAndOffset('Network Error');
      } else {
        showToastWithGravityAndOffset(error.message);
      }
    }
  };

  const DATA = [
    {
      id: 1,
      name: 'Edit Profile',
      screen: 'UserProfile',
      icon: 'person',
    },
    {
      id: 2,
      name: 'Home Address',
      screen: 'Address',
      icon: 'location-pin',
      params: {hideAccountSection: true},
    },
    {
      id: 3,
      name: 'Order',
      screen: 'Order',
      icon: 'shopping-bag',
    },
    {
      id: 4,
      name: 'Wish List',
      screen: 'WishList',
      icon: 'favorite',
    },
    {
      id: 5,
      name: 'LogOut',
      action: handleLogout,
      icon: 'logout',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              if (item.action) {
                item.action();
              } else {
                navigation.navigate(item.screen, item.params || {});
              }
            }}
            style={styles.itemContainer}>
            <View style={styles.row}>
              <View style={styles.iconTextRow}>
                <Icon
                  name={item.icon}
                  size={20}
                  color="#EB0029"
                  style={styles.icon}
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  itemContainer: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#020202',
  },
});
