import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as OpenAnything from 'react-native-openanything';
import axiosInstance from '../axios/axiosInstance';

const AdminOrderDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {inGoing, order} = route.params;

  const [orderState, setOrderState] = useState(() => {
    if (inGoing === 'newOrder') return 'New Order';
    if (inGoing === 'Preparing') return 'Preparing';
    if (inGoing === 'OutOfDelivery') return 'OutOfDelivery';
    if (inGoing === 'Delivered') return 'Delivered';
    if (inGoing === 'Cancelled') return 'Cancelled';
    return 'Unknown';
  });
  const [state, setState] = useState(() => {
    if (orderState === 'New Order') return 'preparing';
    if (orderState === 'Preparing') return 'out_for_delivery';
    if (orderState === 'OutOfDelivery') return 'delivered';
    // if (inGoing === 'Delivered') return 'Delivered';
    // if (inGoing === 'Cancelled') return 'Cancelled';
    return 'Unknown';
  });

  const totalAmount =
    Number(order.receipt.amount) +
    Number(order.receipt.delivery_charges) +
    Number(order.receipt.gst) -
    Number(order.receipt.discount_applied);

  const callButton = () => {
    OpenAnything.Call(order.user.phone_no);
  };

  const EmailButton = () => {
    OpenAnything.Email(`
      ${order.user.email},
      'Food Order Details',
      'Hi, \n\n' +
      'We hope this email finds you well! Below are the details of your recent food order:\n\n' +
      'Order Summary:\n' +

      ${uniqueProducts.map((item, index) => (
        <View style={styles.itemRow} key={index}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQuantity}>Qty: {item.qty}</Text>
        </View>
      ))}
      '- Total Price: ${totalAmount}\n\n' +
      'Delivery Details:\n' +
      '- Name: [Customer Name]\n' +
      '- Address: [Delivery Address]\n' +
      '- Contact: [Phone Number]\n\n' +
      'If you have any questions or need further assistance, feel free to reply to this email.\n\n' +
      'Thank you for choosing FoodMarket!\n\n' +
      'Best regards,\n' +
      'FoodMarket Team',
      `);
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

  const AcceptHandler = async (id, state) => {
    // console.warn(id, state);

    try {
      const formData = new FormData();
      formData.append('order_id', id);
      formData.append('status', state);
      const response = await axiosInstance.post(`/order/status`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // console.warn(response.data);
      showToastWithGravityAndOffset(response.data.message);
      navigation.goBack();
    } catch (error) {
      // console.warn(error);
      showToastWithGravityAndOffset(error.response.data.message);
    }
  };

  const cancelledHandler = async id => {
    // console.warn('AcceptHandler clicked with order IDs:', id);

    try {
      const formData = new FormData();
      formData.append('order_id', id);
      // formData.append('status', 'preparing');
      const response = await axiosInstance.post(`/order/cancel`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // console.warn(response.data);
      showToastWithGravityAndOffset(response.data.message);
    } catch (error) {
      console.warn(error);
      showToastWithGravityAndOffset(error.response.data.message);
    }
  };

  // const handleAcceptOrder = () => {
  //   setOrderState('In Progress');
  // };

  const groupedProducts = order.products.reduce((acc, product) => {
    if (acc[product.name]) {
      acc[product.name].qty += 1; // Increase the quantity for duplicate items
    } else {
      acc[product.name] = {...product, qty: 1}; // Initialize with qty = 1
    }
    return acc;
  }, {});

  // Convert the grouped object back into an array
  const uniqueProducts = Object.values(groupedProducts);

  return (
    <SafeAreaView style={styles.container}>
      {/* {console.warn(order)} */}
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
          <Text style={styles.text}>Detail</Text>
          <Text style={styles.you}>
            Manage with Precision, Deliver with Care!
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon2 name="truck-delivery" size={40} color="#EB0029" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{order.user.name}</Text>
            <Text style={styles.timestamp}>Today at 12:33 AM</Text>
          </View>
          <Text style={styles.orderId}>Order id: {order.id}</Text>
        </View>

        <View style={styles.contactSection}>
          <View style={styles.contactRow}>
            <Icon size={16} name="call" color={'#EB0029'} />
            <Text style={styles.contactText}>+91 {order.user.phone_no}</Text>
            <TouchableOpacity onPress={callButton} style={styles.contactButton}>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Icon size={16} name="mail" color={'#EB0029'} />
            <Text style={styles.contactText}>{order.user.email}</Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={EmailButton}>
              <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Icon size={16} name="location-sharp" color={'#EB0029'} />
            <Text style={styles.contactText}>
              {order.house_no}, {order.address}, {order.city}
            </Text>
          </View>
        </View>

        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items</Text>
          {uniqueProducts.map((item, index) => (
            <View style={styles.itemRow} key={index}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.qty}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>Subtotal:</Text>
            <Text style={{color: '#777'}}>₹{order.receipt.amount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>Delivery Fee:</Text>
            <Text style={{color: '#777'}}>
              ₹{order.receipt.delivery_charges}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>+ Service tax (5%):</Text>
            <Text style={{color: '#777'}}>₹{order.receipt.gst}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>- Discount (3%):</Text>
            <Text style={{color: '#777'}}>
              -₹{order.receipt.discount_applied}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={{color: '#777'}}>Total:</Text>
            <Text style={{color: '#777'}}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        {/* {console.warn(order.id)} */}
        {['New Order', 'Preparing'].includes(orderState) && (
          <>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => cancelledHandler(item.id)}>
              <Text style={styles.button2Text}>Cancel Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => AcceptHandler(order.id, state)}>
              <Text style={styles.button2Text}>Accept Order</Text>
            </TouchableOpacity>
          </>
        )}
        {['Delivered', 'OutOfDelivery'].includes(orderState) && (
          <View
            style={{
              flex: 1,
              // flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.orderId, {fontSize: 16}]}>
                Order States :
              </Text>
              <Text style={{color: 'green', fontSize: 16}}> {orderState}</Text>
            </View>
          </View>
        )}
        {orderState === 'Cancelled' && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.orderId, {fontSize: 16}]}>
                Order States :
              </Text>
              <Text style={{color: 'green', fontSize: 16}}> {orderState}</Text>
            </View>
          </View>
        )}
      </View>
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
    marginRight: 14,
  },

  scrollContent: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
    marginLeft: 16,
    color: '#777',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  orderId: {
    fontSize: 14,
    color: '#333',
  },
  contactSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    flex: 1,
    marginLeft: 8,
    color: '#333',
  },
  contactButton: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EB0029',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#EB0029',
    textAlign: 'center',
  },
  button2Text: {
    color: '#fff',
    textAlign: 'center',
  },
  itemsSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#777',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#777',
  },
  itemQuantity: {
    width: 60,
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    width: 80,
    textAlign: 'right',
    fontSize: 14,
    color: '#777',
  },
  summarySection: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    color: '#777',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    color: '#777',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 14,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  cancelButton: {
    backgroundColor: '#FF4136',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
  },
  acceptButton: {
    backgroundColor: '#2ECC40',
    padding: 12,
    borderRadius: 4,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveredText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AdminOrderDetail;
