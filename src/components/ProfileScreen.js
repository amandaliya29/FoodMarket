import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileTabBar from './profileTab/ProfileTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from './pages/UserAvatar';
import {IMAGE_API} from '@env';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen = () => {
  const [userDetails, setUserDetail] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserDetails = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');

      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        setUserDetail(parsedDetails);
        setImageUri(
          parsedDetails.user && parsedDetails.user.avatar
            ? `${parsedDetails.user.avatar}`
            : null,
        );
        setUserName(parsedDetails.user.name);
      }
    } catch (error) {
      console.warn('Failed to load user details', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserDetails();
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    fetchUserDetails();
  };
  useEffect(() => {
    onRefresh();
    // IMAGE_API;
    fetchUserDetails();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View style={styles.imageBorder}>
          <View style={styles.imgContainer}>
            {imageUri ? (
              <Image
                style={styles.picIcon}
                resizeMode="cover"
                source={{
                  uri: imageUri.includes('file')
                    ? imageUri
                    : `${IMAGE_API}/${imageUri}`,
                }}
                accessibilityLabel="user"
              />
            ) : (
              <UserAvatar size={100} name={userName || 'Food Market'} />
            )}
          </View>
        </View>
        <Text style={styles.nameText}>
          {userDetails ? userDetails.user.name : 'User'}
        </Text>
        <Text style={styles.emailText}>
          {userDetails ? userDetails.user.email : 'user123@gmail.com'}
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 60}}>
        <ProfileTabBar />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  picIcon: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 0.5,
  },
  imageBorder: {
    width: 110,
    height: 110,
    borderWidth: 1.5,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: '#8D92A3',
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    paddingTop: 12,
    paddingBottom: 6,
    fontSize: 18,
    fontWeight: '500',
    color: '#020202',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#8d92a3',
    textAlign: 'center',
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
