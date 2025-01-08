import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as OpenAnything from 'react-native-openanything';

const AdminOrderDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {inGoing} = route.params;

  const [orderState, setOrderState] = useState(() => {
    if (inGoing === 'newOrder') return 'New Order';
    if (inGoing === 'inGoing') return 'In Progress';
    if (inGoing === 'pastOrder') return 'Order Delivered';
    return 'Unknown';
  });

  const items = [
    {name: 'Dal Makhani', quantity: 2, price: 24.0},
    {name: 'Simple Thali - Veg', quantity: 1, price: 18.0},
    {name: 'Deluxe Thali - Non Veg', quantity: 2, price: 48.0},
    {name: 'Missi Roti', quantity: 5, price: 10.0},
    {name: 'Butter Nan', quantity: 2, price: 6.0},
  ];

  const callButton = () => {
    OpenAnything.Call('8469272004');
  };

  const EmailButton = () => {
    OpenAnything.Email(
      'user1@gmail.com',
      'Food Order Details',
      'Hi, \n\n' +
        'We hope this email finds you well! Below are the details of your recent food order:\n\n' +
        'Order Summary:\n' +
        '- Item: [Food Item Name]\n' +
        '- Quantity: [Quantity]\n' +
        '- Total Price: [Total Price]\n\n' +
        'Delivery Details:\n' +
        '- Name: [Customer Name]\n' +
        '- Address: [Delivery Address]\n' +
        '- Contact: [Phone Number]\n\n' +
        'If you have any questions or need further assistance, feel free to reply to this email.\n\n' +
        'Thank you for choosing FoodMarket!\n\n' +
        'Best regards,\n' +
        'FoodMarket Team',
    );
  };

  const handleCancelOrder = () => {
    setOrderState('Cancelled');
  };

  const handleAcceptOrder = () => {
    setOrderState('In Progress');
  };

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
            <Text style={styles.name}>Angel James</Text>
            <Text style={styles.timestamp}>Today at 12:33 AM</Text>
          </View>
          <Text style={styles.orderId}>Order id: 348</Text>
        </View>

        <View style={styles.contactSection}>
          <View style={styles.contactRow}>
            <Icon size={16} name="call" color={'#EB0029'} />
            <Text style={styles.contactText}>+1 234 5678 910</Text>
            <TouchableOpacity onPress={callButton} style={styles.contactButton}>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Icon size={16} name="mail" color={'#EB0029'} />
            <Text style={styles.contactText}>johndoe@gmail.com</Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={EmailButton}>
              <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Icon size={16} name="location-sharp" color={'#EB0029'} />
            <Text style={styles.contactText}>
              3322 Sweetwater Springs Blvd, Spring Valley, CA 91977, USA
            </Text>
          </View>
        </View>

        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items</Text>
          {items.map((item, index) => (
            <View style={styles.itemRow} key={index}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>Subtotal:</Text>
            <Text style={{color: '#777'}}>₹106.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>Delivery Fee:</Text>
            <Text style={{color: '#777'}}>₹0.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>+ Service tax (20%):</Text>
            <Text style={{color: '#777'}}>₹21.20</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{color: '#777'}}>- Discount (20%):</Text>
            <Text style={{color: '#777'}}>-₹21.20</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={{color: '#777'}}>Total:</Text>
            <Text style={{color: '#777'}}>₹106.00</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        {orderState === 'New Order' && (
          <>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelOrder}>
              <Text style={styles.button2Text}>Cancel Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAcceptOrder}>
              <Text style={styles.button2Text}>Accept Order</Text>
            </TouchableOpacity>
          </>
        )}
        {orderState === 'In Progress' && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
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
            <TouchableOpacity
              style={[styles.cancelButton, {flex: 0.8, marginRight: 0}]}
              onPress={handleCancelOrder}>
              <Text style={styles.button2Text}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        )}
        {orderState === 'Order Delivered' && (
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
