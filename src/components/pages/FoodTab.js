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
import axiosInstance from '../axios/axiosInstance';
import {IMAGE_API} from '@env';

const filters = [
  {id: '1', label: 'Sort By', type: 'sort'},
  {id: '3', label: 'Rating 4.0+', type: 'filter', value: 'rating4Plus'},
  {id: '4', label: 'Offers', type: 'filter', value: 'offers'},
  {id: '5', label: '₹300 - ₹600', type: 'filter', value: 'price300to600'},
  {id: '6', label: 'Less than ₹300', type: 'filter', value: 'priceLess300'},
];

const FoodTab = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');

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
        is_offer: item.is_offer,
        offer_percentage: item.offer_percentage,
        offer_text: item.offer_text,
      }));
      setData(products);
    } catch (error) {
      showToastWithGravityAndOffset(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetList();
    IMAGE_API;
    data;
  }, []);

  useEffect(() => {
    if (!selectedFilter) {
      setFilteredData(data);
    }
  }, [data]);

  const applyFilter = filter => {
    let newData = [...data];

    if (filter.type === 'sort') {
      switch (filter.value) {
        case 'costLowToHigh':
          newData.sort((a, b) => a.price - b.price);
          break;
        case 'costHighToLow':
          newData.sort((a, b) => b.price - a.price);
          break;
        case 'ratingHighToLow':
          newData.sort((a, b) => b.rating - a.rating);
          break;
        case 'aToZ':
          newData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'zToA':
          newData.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    } else if (filter.type === 'filter') {
      switch (filter.value) {
        case 'rating4Plus':
          newData = newData.filter(item => item.rating >= 4);
          break;
        case 'price300to600':
          newData = newData.filter(
            item => item.price >= 300 && item.price <= 600,
          );
          break;
        case 'priceLess300':
          newData = newData.filter(item => item.price < 300);
          break;
        case 'offers':
          newData = newData.filter(item => item.is_offer === 1);

          break;
      }
    }

    setFilteredData(newData);
    setSelectedFilter(filter.value);
    setDropdownVisible(false);
  };

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
      onPress={() => {
        navigation.navigate('FoodDetail', {item});
      }}>
      <View style={styles.verticalImageContainer}>
        <Image
          style={styles.verticalImage}
          accessibilityLabel="A beautiful landscape"
          source={{uri: `${IMAGE_API}/${item.image}`}}
        />
      </View>
      <View style={styles.verticalDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.foodPrice}>₹ {item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Icon2 name="star" color={'#fff'} size={12} />
          </View>
        </View>
        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.detailText}>
            {item.description}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="brightness-percent" size={20} color={'red'} />
          <Text style={{color: 'grey', fontSize: 14, paddingLeft: 4}}>
            40% OFF
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* {console.warn(data)} */}
      <ScrollView
        horizontal
        style={styles.filterBar}
        showsHorizontalScrollIndicator={false}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={styles.filterButton}
            onPress={() =>
              filter.label === 'Sort By'
                ? setDropdownVisible(!isDropdownVisible)
                : applyFilter(filter)
            }>
            <Text style={styles.filterText}>{filter.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          {[
            'costLowToHigh',
            'costHighToLow',
            'ratingHighToLow',
            'aToZ',
            'zToA',
          ].map(sortType => (
            <TouchableOpacity
              key={sortType}
              style={styles.dropdownItem}
              onPress={() => applyFilter({type: 'sort', value: sortType})}>
              <Text style={styles.dropdownText}>
                {sortType.replace(/([A-Z])/g, ' $1').trim()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

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
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    paddingRight: 16,
    marginBottom: 10,
    paddingLeft: 16,
    marginTop: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 16,
  },
  selectedButton: {
    backgroundColor: '#EB0029',
  },
  filterText: {
    fontSize: 13,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    left: 16,
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: '#ccc',
    borderRadius: 8,
    zIndex: 1000,
    width: 200,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
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
    alignContent: 'center',
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
  filterWithIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  detailText: {
    fontSize: 13,
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

export default FoodTab;
