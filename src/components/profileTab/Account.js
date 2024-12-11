import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        if (
          error.response.status === 401 ||
          error.response.data.message === 'Unauthenticated'
        ) {
          showToastWithGravityAndOffset(error.response.data.message);
        } else {
          showToastWithGravityAndOffset(error.response.data.message);
        }
      } else if (error.request) {
        showToastWithGravityAndOffset(error.response.data.message);
      } else {
        showToastWithGravityAndOffset(error.response.data.message);
      }
    }
  };

  const DATA = [
    {
      id: 1,
      name: 'Order',
      screen: 'Order',
    },
    {
      id: 2,
      name: 'Edit Profile',
      screen: 'UserProfile',
    },
    {
      id: 3,
      name: 'Home Address',
      screen: 'Address',
      params: {hideAccountSection: true},
    },
    {
      id: 4,
      name: 'LogOut',
      action: handleLogout,
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
              <Text style={styles.itemText}>{item.name}</Text>
              <Icon name="angle-right" size={20} color="#000" />
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
    marginHorizontal: 24,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  itemContainer: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#020202',
  },
});
