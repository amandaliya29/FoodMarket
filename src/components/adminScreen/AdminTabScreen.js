import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Text,
  SafeAreaView,
  Image,
  BackHandler,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import AdminNewOrder from './adminTab/AdminNewOrder';
import AdminPastOrder from './adminTab/AdminPastOrder';
import AdminOutgoning from './adminTab/AdminOutgoning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from '../pages/UserAvatar';

const AdminTabScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [userDetails, setUserDetail] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [userName, setUserName] = useState('');
  const [routes] = useState([
    {key: 'NewOrder', title: 'New Order'},
    {key: 'AdminOutgoning', title: 'Ongoing'},
    {key: 'pastOrder', title: 'Past Order'},
  ]);
  const tabTitleWidths = useRef([]);
  const fixedIndicatorWidth = 40;

  const handleTextLayout = (event, i) => {
    const {width} = event.nativeEvent.layout;
    tabTitleWidths.current[i] = width;
  };

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((_, i) => i);
    const tabWidth = layout.width / props.navigationState.routes.length;

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          const color = index === i ? '#020202' : '#8D92A3';
          const fontWeight = index === i ? 700 : 400;
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={[{opacity}, {color}, {fontWeight}]}
                onLayout={event => handleTextLayout(event, i)}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}

        <Animated.View
          style={[
            styles.indicator,
            {
              width: fixedIndicatorWidth,
              transform: [
                {
                  translateX: props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => {
                      const titleWidth = tabTitleWidths.current[i] || 0;
                      const offsetX = (tabWidth - fixedIndicatorWidth) / 2;
                      return i * tabWidth + offsetX;
                    }),
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    NewOrder: AdminNewOrder,
    pastOrder: AdminPastOrder,
    AdminOutgoning: AdminOutgoning,
  });

  const fetchUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        setUserDetail(parsedDetails);
        setImageUri(
          parsedDetails.data &&
            parsedDetails.data.user &&
            parsedDetails.data.user.avatar
            ? `${IMAGE_API}/${parsedDetails.data.user.avatar}`
            : null,
        );
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
    imageUri;
    backBtn();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>FoodMarket</Text>
          <Text style={styles.letsGetSome}>Let's get some foods</Text>
        </View>
        <View>
          {imageUri ? (
            <Image
              alt="image"
              style={styles.profileImage}
              height={50}
              width={50}
              resizeMode="cover"
              source={{uri: imageUri}}
            />
          ) : (
            <UserAvatar size={45} name={userName || 'Food Market'} />
          )}
        </View>
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

export default AdminTabScreen;
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
  },
  profileImage: {
    height: 44,
    width: 44,
    borderRadius: 8,
    borderWidth: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 0,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomColor: '#F2F2F2',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: '#020202',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
