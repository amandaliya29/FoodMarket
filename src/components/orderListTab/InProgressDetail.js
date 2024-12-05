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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {cancelOrder} from '../redux/cartSlice';

const InProgressDetail = ({route}) => {
  const {item, isPastOrder} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderVerticalItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FoodDetail', {item});
      }}
      key={item.id.toString()}
      style={styles.verticalBox}>
      <View style={styles.verticalImageContainer}>
        <Image style={styles.verticalImage} source={{uri: item.image}} />
      </View>
      <View style={styles.verticalDetailsContainer}>
        <View style={styles.verticalDetails}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Text style={styles.quantityText}>
            {item.quantity === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(cancelOrder({id: item.id, status: 'canceled'}));
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
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
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>Order Details</Text>
          <Text style={styles.you}>Track your meal's progress</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={item.items}
          keyExtractor={item => item.id.toString()}
          renderItem={renderVerticalItem}
          scrollEnabled={false}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.footerTitle}>Payment Transaction</Text>
          {item.items.map(detail => (
            <View key={detail.id} style={styles.paymentDetailRow}>
              <Text style={styles.paymentDetailText}>{detail.name}</Text>
              <Text style={styles.paymentDetailText}>
                ₹{(detail.price * detail.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailTotalText}>Total</Text>
            <Text style={styles.paymentDetailTotalText}>
              ₹
              {item.items
                .reduce(
                  (total, currentItem) =>
                    total + currentItem.price * currentItem.quantity,
                  0,
                )
                .toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deliver To</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>Food Market</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone No:</Text>
            <Text style={styles.value}>+91-1234567890</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>House No:</Text>
            <Text style={styles.value}>C-101</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>123 Main Street</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>Surat</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionTitle}>Payment Type</Text>
            <Text style={[styles.value, {color: 'green'}]}>
              {item.paymentMethod === 'cash'
                ? 'Cash on Delivery'
                : 'Online Payment'}
            </Text>
          </View>
          {isPastOrder && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: 16,
              }}>
              <Text style={[styles.sectionTitle, {fontSize: 16}]}>Status:</Text>
              <Text style={[styles.value, {fontSize: 16}]}>
                {item.status === 'canceled' ? 'Canceled' : 'Delivered'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {!isPastOrder && (
        <TouchableOpacity
          onPress={handleCancelOrder}
          style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default InProgressDetail;

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
    marginBottom: 60,
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
});
