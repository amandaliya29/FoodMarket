import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const InProgress = () => {
  const items = useSelector(state => state.cart.orders);
  const [currentItems, setCurrentItems] = useState(items);
  const navigation = useNavigation();

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...currentItems].reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.order}
            onPress={() => {
              navigation.navigate('InProgressDetail', {item});
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
                <Text>Order Date: {item.orderDate}</Text>
                <Text>Total Price: ₹{item.totalPrice.toFixed(2)}</Text>
                <Text>Payment Method: {item.paymentMethod}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
});

export default InProgress;
