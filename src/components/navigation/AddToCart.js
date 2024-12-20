import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  addOrder,
  clearCart,
  moveOrderToPast,
} from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/Feather';
import {foodList} from '../foodlist';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZORPAY_KEY} from '@env';
import Icon2 from 'react-native-vector-icons/Ionicons';

const AddToCart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    // try {
    //   const userDetails = await AsyncStorage.getItem('userDetails');
    //   if (userDetails) {
    //     const parsedDetails = JSON.parse(userDetails);
    //     setUserDetails(parsedDetails);
    //   }
    // } catch (error) {
    //   console.warn('Failed to load user details', error);
    // }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePaymentOption = option => {
    const orderDetails = {
      items: cartItems,
      totalPrice: totalCartPrice,
      paymentMethod: option,
      orderDate: (() => {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        return `${date} ${time}`;
      })(),
      status: 'inProgress',
    };

    closeModal();

    if (option === 'cash') {
      dispatch(addOrder(orderDetails));
      dispatch(clearCart());
      console.log('Cash on Delivery selected');
      moveToPastOrdersAfterDelay(orderDetails);
    } else if (option === 'online') {
      var options = {
        description: 'Credits towards consultation',
        image: require('../../assets/vector.png'),
        currency: 'INR',
        key: RAZORPAY_KEY,
        amount: (totalCartPrice * 100).toFixed(2),
        name: 'FoodMarket',
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'Razorpay Software',
        },
        theme: {color: '#eb0029'},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          dispatch(addOrder(orderDetails));
          dispatch(clearCart());
          alert(`Success: ${data.razorpay_payment_id}`);
          moveToPastOrdersAfterDelay(orderDetails);
        })
        .catch(error => {
          alert(`Error: ${error.code} | ${error.description}`);
        });
    }
  };

  const moveToPastOrdersAfterDelay = orderDetails => {
    setTimeout(() => {
      dispatch(moveOrderToPast(orderDetails));
    }, 30000);
  };

  const Wishlist = () => {
    const wishlistItems = useSelector(state => state.cart.wishList);

    const renderWishlistItem = ({item, index}) => {
      const isLastItem = index === wishlistItems.length - 1;

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

    return (
      <>
        {wishlistItems.length > 0 ? (
          <View>
            <Text
              style={{
                marginHorizontal: 16,
                marginVertical: 16,
                fontSize: 16,
                color: '#020202',
                marginBottom: 10,
              }}>
              Wishlist
            </Text>
            <FlatList
              ref={flatListRef}
              data={wishlistItems}
              keyExtractor={item => item.id.toString()}
              renderItem={renderWishlistItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={<View style={{width: 16}} />}
              style={styles.horizontalList}
            />
          </View>
        ) : null}
      </>
    );
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
        <TouchableOpacity style={styles.addToCart} onPress={handleCheckout}>
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
          <Text style={styles.text}>Cart</Text>
          <Text style={styles.you}>You deserve better meal</Text>
        </View>
      </View>
      {cartItems.length === 0 ? (
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
          <Wishlist />
        </ScrollView>
      ) : (
        <>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{marginBottom: 50}}
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={
              <View>
                <TopDeal />
                <Wishlist />
              </View>
            }
          />
          <BottomFun />
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handlePaymentOption('cash')}>
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handlePaymentOption('online')}>
              <Text style={styles.paymentText}>Online Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#eb0029',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  paymentText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 16,
  },
  closeText: {
    color: '#eb0029',
    fontSize: 14,
  },
});
