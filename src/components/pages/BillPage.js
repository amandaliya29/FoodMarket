import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Alert,
  Modal,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {IMAGE_API} from '@env';
import {addOrder, clearCart, moveOrderToPast} from '../redux/cartSlice';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZORPAY_KEY} from '@env';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import axiosInstance from '../axios/axiosInstance';

const BillPage = ({route}) => {
  const {item, house, address, city} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  // const ids = item.map(i => i.id);

  const ids = item.flatMap(i => Array(i.quantity).fill(i.id));
  const [order_id, setOrder_id] = useState('');
  const gst =
    item.reduce(
      (total, currentItem) => total + currentItem.price * currentItem.quantity,
      0,
    ) * 0.05;
  const discount =
    item.reduce(
      (total, currentItem) => total + currentItem.price * currentItem.quantity,
      0,
    ) * 0.03;

  const fetchUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);

        setUserDetails(parsedDetails);
      }
    } catch (error) {
      console.warn('Failed to load user details', error);
    }
  };

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  useEffect(() => {
    IMAGE_API;
    item;
    fetchUserDetails();
  }, []);

  const totalCartPrice =
    item.reduce(
      (total, currentItem) => total + currentItem.price * currentItem.quantity,
      0,
    ) +
    gst +
    10 +
    10 -
    discount;

  const handleCheckout = async () => {
    try {
      const formData = new FormData();
      // formData.append('product_ids', ids);
      ids.forEach(id => {
        formData.append('product_ids[]', id);
      });

      formData.append('gst', gst);
      formData.append('delivery_charges', 10);
      formData.append('discount_applied', discount);
      formData.append('house_no', house);
      formData.append('address', address);
      formData.append('city', city);

      const response = await axiosInstance.post('/order/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showToastWithGravityAndOffset(response.data.message);
      setOrder_id(response.data.data.order_id);

      setModalVisible(true);
    } catch (error) {
      showToastWithGravityAndOffset(error.response.data.message);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handlePaymentOption = async option => {
    // const orderDetails = {
    //   items: item,
    //   totalPrice: totalCartPrice,
    //   paymentMethod: option,
    //   orderDate: (() => {
    //     const now = new Date();
    //     const date = now.toLocaleDateString();
    //     const time = now.toLocaleTimeString();
    //     return `${date} ${time}`;
    //   })(),
    //   status: 'inProgress',
    // };

    closeModal();

    if (option === 'cash') {
      // moveToPastOrdersAfterDelay(orderDetails);
      try {
        const formData = new FormData();
        formData.append('order_id', order_id);

        const response = await axiosInstance.post(
          '/order/cash-order',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // console.warn(response);
        // let items = response.data.data;
        // dispatch(addOrder(items));
        dispatch(clearCart());
        showToastWithGravityAndOffset(response.data.message);
        navigation.navigate('Cart');
      } catch (error) {
        // console.warn(error);

        showToastWithGravityAndOffset(error.response.data.message);
      }
    } else if (option === 'online') {
      var options = {
        description: 'Credits towards consultation',
        image: require('../../assets/vector.png'),
        currency: 'INR',
        key: RAZORPAY_KEY,
        amount: totalCartPrice * 100,
        name: 'Food Market',
        prefill: {
          email: userDetails.user.email,
          contact: userDetails?.user?.phone_no,
          name: userDetails.user.name,
        },
        notes: {
          order_id: order_id,
        },
        theme: {color: '#eb0029'},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          // dispatch(addOrder(orderDetails));
          dispatch(clearCart());
          // alert(`Success: ${data.razorpay_payment_id}`);
          // moveToPastOrdersAfterDelay(orderDetails);
          navigation.navigate('Cart');
          showToastWithGravityAndOffset('order is place in your order Address');
        })
        .catch(error => {
          showToastWithGravityAndOffset(
            `Error: ${error.code} | ${error.description}`,
          );
        });
    }
  };

  // const moveToPastOrdersAfterDelay = orderDetails => {
  //   setTimeout(() => {
  //     dispatch(moveOrderToPast(orderDetails));
  //   }, 30000);
  // };
  return (
    <SafeAreaView style={styles.container}>
      {/* {console.warn(userDetails.user.phone_no)} */}
      <View style={styles.head}>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <Icon
            name="chevron-back"
            size={24}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity> */}
        <View>
          <Text style={styles.text}>Conform Details</Text>
          <Text style={styles.you}>Track your meal's progress</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.footerContainer}>
          <Text style={styles.footerTitle}>Order Detail</Text>
          {item.map(detail => (
            <View key={detail.id} style={styles.paymentDetailRow}>
              <Text style={styles.paymentDetailText}>{detail.name}</Text>
              <Text style={styles.paymentDetailText}>
                ₹{(detail.price * detail.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailText}>GST (5%)</Text>
            <Text style={styles.paymentDetailText}>₹{gst.toFixed(2)}</Text>
          </View>
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailText}>Order Packaging Charge</Text>
            <Text style={styles.paymentDetailText}>₹10.00</Text>
          </View>
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailText}>Delivery Charge</Text>
            <Text style={styles.paymentDetailText}>₹10.00</Text>
          </View>
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailText}>Discount (3%)</Text>
            <Text style={styles.paymentDetailText}>
              -₹
              {discount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View
            style={[
              styles.paymentDetailRow,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={styles.paymentDetailTotalText}>Total Paid</Text>
            <Text style={styles.paymentDetailTotalText}>
              ₹
              {(
                item.reduce(
                  (total, currentItem) =>
                    total + currentItem.price * currentItem.quantity,
                  0,
                ) +
                gst +
                10 +
                10 -
                discount
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            {backgroundColor: 'transparent', paddingHorizontal: 20},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.navButtonText, {color: 'red'}]}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            handleCheckout();
          }}>
          <Text style={[styles.navButtonText]}>pay</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>

            <View style={styles.paymentRow}>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => handlePaymentOption('cash')}>
                <Icon2 name="cash-outline" size={30} color="#eb0029" />
                <Text style={styles.paymentText}>Cash</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => handlePaymentOption('online')}>
                <Icon2 name="card-outline" size={30} color="#eb0029" />
                <Text style={styles.paymentText}>Online</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={closeModal}>
                <Icon2 name="close-circle-outline" size={30} color="#eb0029" />
                <Text style={styles.paymentText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BillPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  head: {
    padding: 16,
    paddingTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  backButton: {
    marginRight: 14,
  },
  backIcon: {
    backgroundColor: 'red',
    borderRadius: 5,
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
  scrollContainer: {
    flex: 1,
    marginBottom: 10,
    marginTop: -10,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  verticalBox: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  verticalImage: {
    width: '100%',
    height: '100%',
  },
  verticalDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 12,
  },
  verticalDetails: {
    flex: 1,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    color: 'grey',
    marginLeft: 4,
  },
  footerContainer: {
    padding: 16,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  paymentDetailText: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  paymentDetailTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 80,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    gap: 10,
  },

  navButton: {
    borderRadius: 8,
    backgroundColor: '#eb0029',
    height: 38,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '30%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  paymentButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  paymentText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 15,
  },
});
