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
import {IMAGE_API} from '@env';

const AdminCategories = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const GetList = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const response = await axiosInstance.get('category/list');
      const categories = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        description: item.description,
        products: item.products,
      }));
      setData(categories);
    } catch (error) {
      showToastWithGravityAndOffset(error.response.data.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    GetList();
  };

  useFocusEffect(
    useCallback(() => {
      GetList();
    }, []),
  );
  useEffect(() => {
    onRefresh();
    data;
    // IMAGE_API;
    GetList();
  }, []);

  const DeleteButton = async id => {
    try {
      await axiosInstance.delete(`category/delete/${id}`);
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
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.productsCount}>
          Products: {item.products.length}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.detailsButton]}
            onPress={() =>
              navigation.navigate('CategoriesDetail', {
                category: item,
                isAdmin: true,
              })
            }>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AdminAddCategory', {item, update: true})
            }
            style={[styles.button, styles.updateButton]}>
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

export default AdminCategories;

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
    width: 130,
    height: 135,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  verticalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
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
});
