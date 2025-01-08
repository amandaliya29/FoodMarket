import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import axiosInstance from '../../axios/axiosInstance';
import {IMAGE_API} from '@env';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const AdminCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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
    }
  };

  useEffect(() => {
    GetList();
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
        <View
          style={[styles.placeholderText, {width: '90%', marginVertical: 4}]}
        />
      </View>
    </View>
  );

  const renderVerticalItem = ({item: category}) => (
    <TouchableOpacity
      key={category.id.toString()}
      style={styles.verticalBox}
      onPress={() => {
        navigation.navigate('CategoriesDetail', {category});
      }}>
      <View style={styles.verticalImageContainer}>
        <Image
          style={styles.verticalImage}
          source={{uri: `${IMAGE_API}/${category.image}`}}
        />
      </View>
      <View style={styles.verticalDetails}>
        <Text style={styles.foodName}>{category.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.foodPrice}>
            Products in {category.products.length}
          </Text>
          {/* <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.5</Text>
            <Icon2 name="star" color={'#fff'} size={12} />
          </View> */}
        </View>
        <View>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.detailText}>
            {category.description}
          </Text>
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="brightness-percent" size={20} color={'red'} />
          <Text style={{color: 'grey', fontSize: 14, paddingLeft: 4}}>
            40% OFF
          </Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? Array.from({length: 10}) : data}
        renderItem={loading ? renderPlaceholder : renderVerticalItem}
        keyExtractor={(item, index) =>
          item?.id?.toString() || `placeholder-${index}`
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
    color: 'grey',
  },
  listContainer: {
    paddingBottom: 20,
    paddingRight: 16,
  },
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
  verticalImage: {
    width: '100%',
    height: '100%',
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
  foodPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 2,
    paddingHorizontal: 8,
    backgroundColor: 'green',
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    paddingRight: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  placeholderBox: {
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default AdminCategories;
