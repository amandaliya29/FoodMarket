import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Text,
  SafeAreaView,
  Image,
  BackHandler,
  FlatList,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import AdminNewOrder from './adminTab/AdminNewOrder';
import AdminOutgoning from './adminTab/AdminOutOfDelivery';
import AdminDelivered from './adminTab/AdminDelivered';
import AdminCancelled from './adminTab/AdminCancelled';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from '../pages/UserAvatar';
import AdminPreparingOrder from './adminTab/AdminPriparingOrder';
import AdminOutOfDelivery from './adminTab/AdminOutOfDelivery';

const AdminTabScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [userDetails, setUserDetail] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [userName, setUserName] = useState('');

  const routes = [
    {key: 'NewOrder', title: 'New Order'},
    {key: 'Preparing', title: 'Preparing'},
    {key: 'AdminOutOfDelivery', title: 'Out Of Delivery'},
    {key: 'delivered', title: 'Delivered'},
    {key: 'cancelled', title: 'Cancelled'},
  ];

  const renderTabBar = ({navigationState}) => (
    <View style={styles.tabBar}>
      <FlatList
        data={navigationState.routes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({item, index: i}) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.tabItem, index === i && styles.activeTab]}
            onPress={() => setIndex(i)}>
            <Text style={[styles.tabText, index === i && styles.activeTabText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderScene = SceneMap({
    NewOrder: AdminNewOrder,
    Preparing: AdminPreparingOrder,
    AdminOutOfDelivery: AdminOutOfDelivery,
    delivered: AdminDelivered,
    cancelled: AdminCancelled,
  });

  const fetchUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        setUserDetail(parsedDetails);
        setImageUri(parsedDetails?.avatar || '');
        setUserName(parsedDetails.user?.name || 'Food Market');
      }
    } catch (error) {
      console.warn('Failed to load user details', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>FoodMarket</Text>
          <Text style={styles.letsGetSome}>Let's get some foods</Text>
        </View>
        {imageUri ? (
          <Image
            style={styles.profileImage}
            source={{uri: imageUri}}
            resizeMode="cover"
          />
        ) : (
          <UserAvatar size={45} name={userName} />
        )}
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  text: {fontSize: 20, fontWeight: '500', color: 'black'},
  letsGetSome: {fontSize: 13, fontWeight: '300', color: '#8d92a3'},
  head: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  profileImage: {
    height: 44,
    width: 44,
    borderRadius: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderRadius: 2,
    borderBottomColor: '#020202',
  },
  tabText: {color: '#8D92A3'},
  activeTabText: {color: '#020202', fontWeight: '700'},
});

export default AdminTabScreen;
