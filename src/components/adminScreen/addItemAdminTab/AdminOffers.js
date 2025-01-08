import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../../axios/axiosInstance';

const AdminOffers = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const fetchProductList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/product/list');
      const products = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        ingredients: item.ingredients,
        stock: item.stock,
        description: item.description,
        rating: item.rate,
      }));
      setData(products);
      setFilteredData(products);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const renderPlaceholder = () => (
    <View style={styles.verticalBox}>
      <View style={[styles.verticalImageContainer, styles.placeholderBox]} />
      <View style={styles.verticalDetails}>
        <View style={[styles.placeholderText, {width: '60%'}]} />
        <View
          style={[styles.placeholderText, {width: '40%', marginVertical: 4}]}
        />
        <View
          style={[styles.placeholderText, {width: '90%', marginVertical: 4}]}
        />
      </View>
    </View>
  );

  const renderVerticalItem = ({item}) => (
    <TouchableOpacity
      key={item.id.toString()}
      style={styles.verticalBox}
      onPress={() => navigation.navigate('FoodDetail', {item})}>
      <View style={styles.verticalImageContainer}>
        <Image style={styles.verticalImage} source={{uri: item.image}} />
      </View>
      <View style={styles.verticalDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <View style={styles.priceAndRatingContainer}>
          <Text style={styles.foodPrice}>₹ {item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Icon2 name="star" color="#fff" size={12} />
          </View>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.detailText}>
          {item.description}
        </Text>
        <View style={styles.discountContainer}>
          <Icon name="brightness-percent" size={20} color="red" />
          <Text style={styles.discountText}>40% OFF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <FlatList
          data={Array.from({length: data.length || 6})}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderPlaceholder}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderVerticalItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {paddingBottom: 20, paddingRight: 16},
  verticalBox: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  verticalImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  verticalImage: {width: '100%', height: '100%'},
  verticalDetails: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
  },
  foodPrice: {fontSize: 14, color: '#888', marginTop: 4},
  priceAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    paddingHorizontal: 8,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  ratingText: {color: '#fff', fontSize: 14, paddingRight: 2},
  detailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  discountContainer: {flexDirection: 'row', alignItems: 'center'},
  discountText: {color: 'grey', fontSize: 14, paddingLeft: 4},
  placeholderBox: {backgroundColor: '#e0e0e0'},
  placeholderText: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default AdminOffers;
