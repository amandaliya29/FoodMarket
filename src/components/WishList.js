import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToWishList, removeFromWishList} from './redux/cartSlice';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {foodList} from './foodlist';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

const WishList = () => {
  const dispatch = useDispatch();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const wishListItems = useSelector(state => state.cart.wishList);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleAddToWishList = item => {
    dispatch(addToWishList(item));
  };

  const handleRemoveFromWishList = item => {
    dispatch(removeFromWishList(item));
  };

  const TopDeal = () => {
    return (
      <View>
        <Text
          style={{
            marginHorizontal: 16,
            marginVertical: 16,
            fontSize: 16,
            color: '#020202',
            marginBottom: 10,
          }}>
          Top Deal
        </Text>
        <View>
          <View>
            <FlatList
              data={foodList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyExtractor={item => item.id.toString()}
              renderItem={renderHorizontalItem}
              ItemSeparatorComponent={<View style={{width: 16}}></View>}
              style={styles.horizontalList}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderHorizontalItem = ({item, index}) => {
    const isLastItem = index === foodList.length - 1;

    return (
      <TouchableOpacity
        key={item.id.toString()}
        style={[
          styles.box,
          isLastItem && {marginRight: 16},
          index === 0 && {marginLeft: 16},
        ]}
        onPress={() => {
          navigation.navigate('FoodDetail', {item});
        }}>
        <View style={styles.imageContainer(width, height)}>
          <Image style={styles.image} source={{uri: item.image}} />
        </View>

        <View style={{paddingLeft: 12}}>
          <Text style={styles.foodName}>{item.name}</Text>
          <View style={{flexDirection: 'row', marginTop: 6}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                padding: 2,
                paddingHorizontal: 6,
                backgroundColor: 'green',
              }}>
              <Text style={{color: '#fff', fontSize: 14, paddingRight: 2}}>
                {item.rating.toFixed(1)}
              </Text>
              <Icon2 name="star" color={'#fff'} size={12} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  const renderVerticalItem = ({item}) => (
    <TouchableOpacity
      key={item.id.toString()}
      style={styles.verticalBox}
      onPress={() => {
        navigation.navigate('FoodDetail', {item});
      }}>
      <View style={styles.verticalImageContainer}>
        <Image style={styles.verticalImage} source={{uri: item.image}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.verticalDetails}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon
            name="chevron-back"
            size={24}
            color="white"
            backgroundColor="red"
            style={{borderRadius: 5}}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>WishList</Text>
          <Text style={styles.you}>Your favourited products</Text>
        </View>
      </View>
      {wishListItems.length === 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View style={styles.emptyCartContainer}>
              <Image source={require('../assets/wishlist.png')} />
              <View style={{marginTop: 10}}>
                <Text
                  style={[
                    styles.emptyCartText,
                    {
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#000',
                      marginBottom: 10,
                    },
                  ]}>
                  WishList is Empty!
                </Text>
                <Text style={styles.emptyCartText}>
                  Save products you like in Wishlist.
                </Text>
                <Text style={styles.emptyCartText}>
                  You can review and easily add them to cart anytime later.
                </Text>
              </View>
            </View>
            <TopDeal />
          </View>
        </ScrollView>
      ) : (
        <>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={wishListItems}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderVerticalItem}
            ListFooterComponent={<TopDeal />}
          />
        </>
      )}
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
  horizontalList: {
    paddingBottom: 16,
  },
  you: {
    fontSize: 13,
    fontWeight: '300',
    color: '#8d92a3',
  },
  head: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  backButton: {
    marginRight: 16,
  },
  verticalBox: {
    marginTop: -2,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    color: '#ccc',
  },
  verticalImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  verticalImage: {
    width: '100%',
    height: '100%',
  },
  verticalDetails: {
    marginLeft: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
  },
  foodPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  emptyCartContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
    color: '#8d92a3',
    textAlign: 'center',
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
    elevation: 0,
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageContainer: (width, height) => ({
    width: 200,
    height: 140,
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 12,
  }),
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
  foodPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default WishList;
