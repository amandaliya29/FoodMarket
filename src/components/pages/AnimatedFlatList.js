import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {foodList} from '../foodlist';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../axios/axiosInstance';
import {IMAGE_API} from '@env';
const AnimatedFlatList = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const GetList = async () => {
    try {
      const response = await axiosInstance.get('/offer/list');
      const products = response.data.data.map(item => ({
        id: item.id,
        banner: item.banner,
      }));
      setData(products);
    } catch (error) {
      showToastWithGravityAndOffset(error.response?.data?.message);
    }
  };

  useEffect(() => {
    GetList(), data;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex === foodList.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
        return newIndex;
      });
    }, 30000000000);
    return () => clearInterval(interval);
  }, []);

  const renderHorizontalItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id.toString()}
        style={{
          width,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('Offer', {item})}>
        <View style={[styles.box, {width: width - 30}]}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: `${IMAGE_API}/${item.banner}`}}
            />

            {/* <View style={styles.textOverlay}>
              <Text style={styles.foodName}>{item.name}</Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {foodList.map((_, i) => {
          const opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={i} style={[styles.dot, {opacity}]} />;
        })}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderHorizontalItem}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="normal"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        style={styles.horizontalList}
      />
      {renderDots()}
    </View>
  );
};

export default AnimatedFlatList;

const styles = StyleSheet.create({
  box: {
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#8D92A3',
    shadowOffset: {width: 1, height: 3},
    shadowRadius: 20,
    elevation: 8,
    shadowOpacity: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderWidth: 0.5,
    borderColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    left: 15,
    top: '15%',
    transform: [{translateY: -20}],
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  foodName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  foodOffer: {
    fontSize: 14,
    color: '#FFD700',
  },
  dotContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4D61',
    marginHorizontal: 5,
  },
  horizontalList: {
    paddingBottom: 16,
  },
});
