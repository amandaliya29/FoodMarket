import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileTabBar from './profileTab/ProfileTabBar';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View style={styles.imageBorder}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.picIcon}
              resizeMode="cover"
              source={require('../assets/photo2.png')}
            />
          </View>
        </View>
        <Text style={styles.nameText}>FoodMarket</Text>
        <Text style={styles.emailText}>foodmarket123@gmail.com</Text>
      </View>
      <View style={{flex: 1, marginTop: 66}}>
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
    height: 90,
    borderRadius: 45,
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
    width: 90,
    height: 90,
    borderRadius: 45,
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
