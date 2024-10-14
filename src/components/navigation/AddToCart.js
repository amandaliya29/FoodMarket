import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {incrementQuantity, decrementQuantity} from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/Feather';
import {foodList} from '../foodlist';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';

const AddToCart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

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
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => (
    <View style={{marginHorizontal: 16, marginVertical: 5}}>
      <View key={item.id.toString()} style={[styles.verticalBox]}>
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
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View></View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 100,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(decrementQuantity({id: item.id}));
                }}>
                <Icon
                  name="minus"
                  size={16}
                  color={'black'}
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                />
              </TouchableOpacity>
              <Text style={{color: 'black', fontSize: 16}}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(incrementQuantity({id: item.id}))}>
                <Icon
                  name="plus"
                  size={16}
                  color={'black'}
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const BottomFun = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 16,
          marginVertical: 5,
          backgroundColor: 'white',
          paddingVertical: 5,
          borderTopColor: '#ccc',
          borderTopWidth: 0.8,
        }}>
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Total Price:
          </Text>
          <Text style={{fontSize: 18, color: 'black'}}>
            ₹{totalCartPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCart} onPress={() => {}}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
            Checkout Now
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>My Cart</Text>
          <Text style={styles.you}>You deserve better meal</Text>
        </View>
      </View>
      {cartItems.length === 0 ? (
        <View style={{flex: 1}}>
          <View style={styles.emptyCartContainer}>
            <Image source={require('../../assets/empty.png')} />
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
                Your Cart is Empty!
              </Text>
              <Text style={styles.emptyCartText}>Seems like you have not</Text>
              <Text style={styles.emptyCartText}>ordered any food yet</Text>
            </View>
          </View>
          <TopDeal />
        </View>
      ) : (
        <>
          <FlatList
            style={{marginBottom: 50}}
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={<TopDeal />}
          />
          <BottomFun />
        </>
      )}
    </SafeAreaView>
  );
};

export default AddToCart;

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
  you: {
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
  verticalBox: {
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
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
  addToCart: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#eb0029',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
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
  horizontalList: {
    paddingBottom: 16,
  },
});