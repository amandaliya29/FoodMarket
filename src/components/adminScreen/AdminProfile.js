import React, {useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import UserAvatar from '../pages/UserAvatar';
import {IMAGE_API} from '@env';
import axiosInstance from '../axios/axiosInstance';

const AdminProfile = ({navigation}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [userName, setUserName] = useState('');

  const showToast = message => {
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
        showToast(response.data.message);
        navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.request
        ? 'Network Error'
        : error.message;
      showToast(errorMessage);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const storedDetails = await AsyncStorage.getItem('userDetails');
      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);
        setUserDetails(parsedDetails);
        setImageUri(
          parsedDetails?.user?.avatar
            ? `${IMAGE_API}/${parsedDetails.user.avatar}`
            : '',
        );
        setUserName(parsedDetails?.user?.name || '');
      }
    } catch (error) {
      console.warn('Failed to load user details', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserDetails();
    }, []),
  );

  const menuOptions = [
    {id: 1, name: 'Edit Profile', screen: 'AdminSetProfile', icon: 'person'},
    {
      id: 2,
      name: 'Privacy & Policy',
      screen: 'PrivacyPolicyScreen',
      icon: 'privacy-tip',
    },
    {
      id: 3,
      name: 'Terms & Conditions',
      screen: 'TermsConditionsScreen',
      icon: 'gavel',
    },
    {id: 4, name: 'Help & Support', screen: 'Help', icon: 'support-agent'},
    {id: 5, name: 'About Us', screen: 'AboutUs', icon: 'info'},
    {id: 6, name: 'LogOut', action: handleLogout, icon: 'logout'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.avatarBorder}>
          <View style={styles.avatarContainer}>
            {imageUri ? (
              <Image
                style={styles.avatarImage}
                resizeMode="cover"
                source={{uri: imageUri}}
              />
            ) : (
              <UserAvatar size={100} name={userName || 'Food Market'} />
            )}
          </View>
        </View>
        <Text style={styles.userName}>{userDetails?.user?.name || 'User'}</Text>
        <Text style={styles.userEmail}>
          {userDetails?.user?.email || 'user123@gmail.com'}
        </Text>
      </View>

      <View style={styles.menuSection}>
        <FlatList
          data={menuOptions}
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
              style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <Icon
                    name={item.icon}
                    size={20}
                    color="#EB0029"
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>{item.name}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#000" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarBorder: {
    width: 110,
    height: 110,
    borderWidth: 1.5,
    borderRadius: 55,
    borderColor: '#8D92A3',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#020202',
    textAlign: 'center',
    marginTop: 12,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '300',
    color: '#8D92A3',
    textAlign: 'center',
  },
  menuSection: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 14,
    color: '#020202',
  },
});
