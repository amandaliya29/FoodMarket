import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from './pages/UserAvatar';
import {IMAGE_API} from '@env';
import Categories from './pages/Categories';
import AnimatedFlatList from './pages/AnimatedFlatList';
import FoodTab from './pages/FoodTab';

const HomeScreen = () => {
  const [userDetails, setUserDetail] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [userName, setUserName] = useState('');

  const fetchUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        setUserDetail(parsedDetails);
        setImageUri(`${IMAGE_API}/` + parsedDetails.data.user.avatar);
        setUserName(parsedDetails.data.user.name);
      }
    } catch (error) {
      console.warn('Failed to load user details', error);
    }
  };

  const backBtn = () => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  };

  useEffect(() => {
    fetchUserDetails();
    backBtn();
  }, []);

  const renderHeader = () => (
    <View style={styles.head}>
      <View>
        <Text style={styles.text}>FoodMarket</Text>
        <Text style={styles.letsGetSome}>Let's get some foods</Text>
      </View>
      <View>
        {imageUri ? (
          <Image
            style={styles.profileImage}
            height={50}
            width={50}
            resizeMode="cover"
            source={imageUri ? {uri: imageUri} : require('../assets/pic.png')}
          />
        ) : (
          <UserAvatar size={45} name={userName || 'Food Market'} />
        )}
      </View>
    </View>
  );

  const renderContent = () => (
    <>
      <Categories />
      <AnimatedFlatList />
      <FoodTab />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderContent}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 16}}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  letsGetSome: {
    fontSize: 13,
    fontWeight: '300',
    color: '#8d92a3',
  },
  head: {
    padding: 16,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  profileImage: {
    height: 44,
    width: 44,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default HomeScreen;
