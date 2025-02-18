import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axiosInstance from '../../axios/axiosInstance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {IMAGE_API} from '@env';
import ToggleSwitch from 'toggle-switch-react-native';

const AdminAddItem = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [is_active, setIs_active] = useState(false);
  const [imageUri, setImageUri] = useState('');
  // const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const handleToggle = async (isOn, item) => {
    // Update the is_active state for the specific item
    const updatedData = data.map(product =>
      product.id === item.id ? {...item, is_active: isOn} : product,
    );
    setData(updatedData);

    try {
      // const formData = new FormData();
      // formData.append('name', name);
      // formData.append('description', description);
      // formData.append('ingredients', ingredients);
      // formData.append('price', price);
      // formData.append('stock', stock);
      // formData.append('is_hot', is_hot);
      // formData.append('is_active', is_active ? 1 : 0);
      // console.log(is_active ? 1 : 0);
      // formData.append('category_id', category);
      // console.log(imageUri);

      // formData.append('image', imageUri);
      // formData.append('id', id);
      await axiosInstance.post('product/save', {
        ...item,
        is_active: isOn ? 1 : 0,
      });
      showToastWithGravityAndOffset('Active status updated successfully.');
    } catch (error) {
      showToastWithGravityAndOffset(
        error.response?.data?.message || 'Failed to update Active status.',
      );
    }
  };

  const fetchProductList = async () => {
    setLoading(true);
    setRefreshing(true);
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
        category_id: item.category_id,
        is_hot: item.is_hot,
        is_active: !!item.is_active,
      }));
      setData(products);
    } catch (error) {
      showToast(error.response.data.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchProductList();
  };

  useFocusEffect(
    useCallback(() => {
      fetchProductList();
      IMAGE_API;
    }, []),
  );

  useEffect(() => {
    onRefresh();
    fetchProductList();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setImageUri(data[0]?.image || '');
      setIs_active(data[0]?.is_hot || false);
    }
  }, [data]);

  const DeleteButton = async id => {
    try {
      await axiosInstance.delete(`product/delete/${id}`);
      setData(prevData => prevData.filter(item => item.id !== id));

      showToastWithGravityAndOffset('Item deleted successfully.');
    } catch (error) {
      showToastWithGravityAndOffset(error.response?.data?.message);
    }
  };

  const renderPlaceholder = () => (
    <View style={styles.verticalBox}>
      <View style={[styles.verticalImageContainer, styles.placeholderBox]} />
      <View style={styles.verticalDetails}>
        <View
          style={[styles.placeholderText, {width: '60%', marginLeft: '4%'}]}
        />
        <View
          style={[
            styles.placeholderText,
            {width: '90%', marginVertical: 4, marginLeft: '4%'},
          ]}
        />
        <View
          style={[
            styles.placeholderText,
            {width: '40%', marginVertical: 4, marginLeft: '4%'},
          ]}
        />
        <View
          style={[
            styles.placeholderText,
            {width: '90%', marginVertical: 4, marginLeft: '4%'},
          ]}
        />
      </View>
    </View>
  );

  const renderCategoryItem = ({item}) => (
    <View style={styles.container}>
      <View style={styles.verticalImageContainer}>
        <Image
          style={styles.verticalImage}
          source={{uri: `${IMAGE_API}/${item.image}`}}
          accessibilityLabel="A beautiful landscape"
        />
      </View>
      <View style={styles.detailsContainer}>
        <View
          style={[
            styles.priceAndRatingContainer,
            {
              marginBottom: 10,
            },
          ]}>
          <View style={styles.foodNameContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.foodName}>
              {item.name}
            </Text>
          </View>
          <ToggleSwitch
            isOn={item.is_active}
            onColor="#eb0029"
            offColor="#ccc"
            label=""
            labelStyle={{
              color: '#333',
              fontWeight: '500',
              marginLeft: 24,
            }}
            size="small"
            onToggle={isOn => handleToggle(isOn, item)}
          />
        </View>
        <View style={styles.priceAndRatingContainer}>
          <Text style={styles.foodPrice}>₹ {item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Icon2 name="star" color="#fff" size={12} />
          </View>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.detailText}>
          {item.description}
        </Text>
        <View style={styles.discountContainer}>
          <Icon name="brightness-percent" size={20} color="red" />
          <Text style={styles.discountText}>40% OFF</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.detailsButton]}
            onPress={() => navigation.navigate('AdminDetail', {item})}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={() =>
              navigation.navigate('AdminAddProduct', {item, update: true})
            }>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => {
              DeleteButton(item.id);
            }}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <FlatList
          data={Array(data.length || 16).fill({})}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderPlaceholder}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCategoryItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

export default AdminAddItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  verticalImageContainer: {
    width: 135,
    height: 155,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  verticalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: '4%',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  foodNameContainer: {
    flex: 1,
    marginRight: 5,
  },
  productsCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  updateButton: {
    backgroundColor: '#f1c40f',
  },
  verticalBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  placeholderBox: {
    backgroundColor: '#e0e0e0',
  },
  verticalDetails: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  placeholderText: {
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
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
});
