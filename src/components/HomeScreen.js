import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {foodList} from './foodlist';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import MyTabView from './navigation/MyTabView';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex === foodList.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current.scrollToIndex({index: newIndex, animated: true});
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderHorizontalItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        key={item.id.toString()}
        style={{
          width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('FoodDetail', {item})}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{scale}],
              width: width - 64,
            },
          ]}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: item.image}} />
          </View>

          <View style={{paddingLeft: 12}}>
            <Text style={styles.foodName}>{item.name}</Text>
            <View style={{flexDirection: 'row', marginTop: 6}}>
              <StarRatingDisplay
                rating={item.rating}
                starSize={20}
                color={'#EB0029'}
                starStyle={{marginRight: -2, marginLeft: 0}}
              />
              <Text style={{marginLeft: 8, color: 'grey'}}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>FoodMarket</Text>
          <Text style={styles.letsGetSome}>Let's get some foods</Text>
        </View>
        <Image
          style={styles.profileImage}
          height={50}
          width={50}
          resizeMode="contain"
          source={require('../assets/photo2.png')}
        />
      </View>

      <View>
        <Animated.FlatList
          ref={flatListRef}
          data={foodList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderHorizontalItem}
          pagingEnabled={true}
          snapToAlignment="center"
          snapToInterval={width}
          decelerationRate="normal"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          onMomentumScrollEnd={handleScrollEnd}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.horizontalList}
        />
      </View>

      <MyTabView />
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
  },
  profileImage: {
    height: 44,
    width: 44,
    borderRadius: 8,
    borderWidth: 1,
  },
  box: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    overflow: 'hidden',
    paddingBottom: 12,
    shadowColor: '#8D92A3',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 15,
    elevation: 10,
    shadowOpacity: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
  },
  horizontalList: {
    paddingBottom: 16,
    alignContent: 'center',
  },
});

export default HomeScreen;
