import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '../../axios/axiosInstance';

const AdminOutOfDelivery = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    GetOrder();
  }, []);

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const GetOrder = async () => {
    try {
      const response = await axiosInstance.get(
        `/order/list?search=out_for_delivery`,
      );
      const formattedOrders = response.data.data.map(order => ({
        ...order,
        products: order.products || [],
      }));

      setOrders(formattedOrders);
      // showToastWithGravityAndOffset(response.data.message);
    } catch (error) {
      showToastWithGravityAndOffset(error.response.data.message);
    }
  };

  const AcceptHandler = async id => {
    // console.warn('AcceptHandler clicked with order IDs:', id);

    try {
      const formData = new FormData();
      formData.append('order_id', id);
      formData.append('status', 'delivered');
      const response = await axiosInstance.post(`/order/status`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // console.warn(response.data);
      showToastWithGravityAndOffset(response.data.message);
    } catch (error) {
      // console.warn(error);
      showToastWithGravityAndOffset(error.response.data.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetOrder();
    }, []),
  );

  const renderOrderItem = ({item}) => {
    const totalAmount =
      Number(item.receipt?.amount || 0) +
      Number(item.receipt?.delivery_charges || 0) +
      Number(item.receipt?.gst || 0) -
      Number(item.receipt?.discount_applied || 0);

    // Group products by name and sum their quantities
    const groupedProducts = item.products.reduce((acc, product) => {
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
      <View style={styles.container}>
        {/* {console.warn(item)} */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="truck-delivery" size={40} color="#EB0029" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{item.user?.name || 'Unknown'}</Text>
            <Text style={styles.time}>Today at 12:33 AM</Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <Text style={styles.total}>Total: ₹{totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <FlatList
          data={uniqueProducts}
          keyExtractor={product => product.id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>Qty: {item.qty}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          )}
        />

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AdminOrderDetail', {
                inGoing: 'OutOfDelivery',
                order: item,
              })
            }
            style={[styles.button, styles.detailsButton]}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel Order</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => AcceptHandler(item.id)}>
            <Text style={styles.buttonText}>Accept Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.allContainer}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AdminOutOfDelivery;

const styles = StyleSheet.create({
  allContainer: {flex: 1},
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  headerInfo: {flex: 1},
  name: {fontSize: 16, fontWeight: 'bold', color: '#777'},
  time: {fontSize: 12, color: '#777'},
  orderInfo: {alignItems: 'flex-end'},
  orderId: {fontSize: 14, fontWeight: '600', color: '#777'},
  total: {fontSize: 14, color: '#2ecc71', fontWeight: '600'},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemName: {flex: 1, fontSize: 14, color: '#777'},
  itemQty: {width: 60, textAlign: 'center', fontSize: 14, color: '#777'},
  itemPrice: {width: 80, textAlign: 'right', fontSize: 14, color: '#777'},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButton: {backgroundColor: '#3498db'},
  cancelButton: {backgroundColor: '#e74c3c'},
  acceptButton: {backgroundColor: '#2ecc71'},
  buttonText: {color: '#fff', fontSize: 14, fontWeight: '600'},
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
