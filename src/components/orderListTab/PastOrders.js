import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';

const PastOrders = () => {
  const pastOrders = useSelector(state => state.cart.pastOrders);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {pastOrders.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image
            source={require('../../assets/orderEmpty.png')}
            style={styles.emptyImage}
          />
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
              Your Past Order is Empty!
            </Text>
            <Text style={styles.emptyCartText}>Seems like you have not</Text>
            <Text style={styles.emptyCartText}>ordered any food yet</Text>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={[...pastOrders].reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.order}
              onPress={() => {
                navigation.navigate('InProgressDetail', {
                  item,
                  isPastOrder: true,
                });
              }}>
              <View style={styles.orderContent}>
                <View style={styles.imageContainer}>
                  {item.items && item.items.length > 3 ? (
                    <>
                      {item.items.slice(0, 3).map((orderItem, index) => (
                        <Image
                          key={index}
                          source={{uri: orderItem.image}}
                          style={styles.image}
                        />
                      ))}
                      <View style={styles.countContainer}>
                        <Text style={styles.countText}>
                          +{item.items.length - 3}
                        </Text>
                      </View>
                    </>
                  ) : (
                    item.items.map((orderItem, index) => (
                      <Image
                        key={index}
                        source={{uri: orderItem.image}}
                        style={
                          item.items.length === 1
                            ? styles.singleImage
                            : styles.image
                        }
                      />
                    ))
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Order Date: {item.orderDate}</Text>
                  <Text style={styles.text}>
                    Total Price: ₹{item.totalPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.text}>
                    Payment Method: {item.paymentMethod}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  order: {
    marginHorizontal: 8,
    paddingVertical: 5,
  },
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 65,
    height: 65,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#ccc',
    gap: 0,
    overflow: 'hidden',
  },
  image: {
    width: 30,
    height: 30,
    margin: 1,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  singleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  countContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    color: '#fff',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  emptyCartText: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
    color: '#8d92a3',
    textAlign: 'center',
  },
});

export default PastOrders;
