import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {IMAGE_API} from '@env';
import axiosInstance from '../axios/axiosInstance';

const PastOrders = () => {
  const [items, setItems] = useState([]);
  // const [currentItems, setCurrentItems] = useState(items);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await GetList();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      GetList();
    }, []),
  );

  const GetList = async () => {
    try {
      const response = await axiosInstance.get('/order/past-order');
      const data = response?.data?.data ?? [];
      setItems(data);
    } catch (error) {
      console.warn(error);
    }
  };

  // useEffect(() => {
  //   setCurrentItems(items);
  // }, [items]);

  useEffect(() => {
    GetList();
    IMAGE_API;
    items;
  }, []);
  return (
    <View style={styles.container}>
      {Array.isArray(items) && items.length === 0 ? (
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
              Your In Progress Order is Empty!
            </Text>
            <Text style={styles.emptyCartText}>Seems like you have not</Text>
            <Text style={styles.emptyCartText}>ordered any food yet</Text>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const totalAmount =
              Number(item.receipt?.amount || 0) +
              Number(item.receipt?.delivery_charges || 0) +
              Number(item.receipt?.gst || 0) -
              Number(item.receipt?.discount_applied || 0);

            return (
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
                    {item.products && item.products.length > 3 ? (
                      <>
                        {item.products.slice(0, 3).map((orderItem, index) => (
                          <Image
                            key={index}
                            source={{uri: `${IMAGE_API}/${orderItem.image}`}}
                            style={styles.image}
                          />
                        ))}
                        <View style={styles.countContainer}>
                          <Text style={styles.countText}>
                            +{item.products.length - 3}
                          </Text>
                        </View>
                      </>
                    ) : (
                      item.products.map((orderItem, index) => (
                        <Image
                          key={index}
                          source={{uri: `${IMAGE_API}/${orderItem.image}`}}
                          style={
                            item.products.length === 1
                              ? styles.singleImage
                              : styles.image
                          }
                        />
                      ))
                    )}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      Order Date: {item.orderDate}
                    </Text>
                    <Text style={styles.text}>
                      Total Price: ₹{totalAmount.toFixed(2)}
                    </Text>
                    <Text style={styles.text}>
                      Payment Method: {item.payment_type}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
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
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    color: '#333',
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
  emptyCartText: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
    color: '#8d92a3',
    textAlign: 'center',
  },
});

export default PastOrders;
