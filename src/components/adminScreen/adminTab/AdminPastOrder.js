import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {foodList} from '../../foodlist';

const AdminPastOrder = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const orderDetails = [
    {id: '1', item: 'Dal Makhani', qty: 2, price: '₹24.00'},
    {id: '2', item: 'Simple Thali - Veg', qty: 1, price: '₹18.00'},
    {id: '3', item: 'Deluxe Thali - Non Veg', qty: 2, price: '₹48.00'},
    {id: '4', item: 'Missi Roti', qty: 5, price: '₹10.00'},
    {id: '5', item: 'Butter Nan', qty: 2, price: '₹6.00'},
  ];

  const renderVerticalItem = ({item}) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="truck-delivery" size={40} color="#EB0029" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>Angel James</Text>
          <Text style={styles.time}>Today at 12:33 AM</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order id: 348</Text>
          <Text style={styles.total}>Total: ₹106.00</Text>
        </View>
      </View>

      <FlatList
        data={orderDetails}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.item}</Text>
            <Text style={styles.itemQty}>Qty: {item.qty}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        )}
      />
      <View style={styles.actions}>
        {/* <TouchableOpacity style={[styles.button, styles.callButton]}>
          <Text style={styles.buttonText}>Call Customer</Text>
        </TouchableOpacity> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={[styles.buttonText, {color: 'grey'}]}>
            Order States :
          </Text>
          <Text style={[styles.buttonText, {color: 'green'}]}>
            {' '}
            Order delivered
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AdminOrderDetail', {inGoing: 'pastOrder'});
          }}
          style={[styles.button, styles.detailsButton]}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.acceptButton]}>
          <Text style={styles.buttonText}>Accept Order</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <View style={styles.allContainer}>
      <FlatList
        data={foodList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderVerticalItem}
      />
    </View>
  );
};

export default AdminPastOrder;

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
  },
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
  orderInfo: {
    alignItems: 'flex-end',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
  },
  total: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: '600',
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
  itemQty: {
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
  message: {
    fontSize: 12,
    color: '#333',
    marginVertical: 10,
  },
  actions: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 0.5,
    marginHorizontal: 0,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#f39c12',
  },
  detailsButton: {
    backgroundColor: '#3498db',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  acceptButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
