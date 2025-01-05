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
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '../axios/axiosInstance';

const sortOptions = [
  {id: '1', label: 'Filter', value: 'filter'},
  {id: '2', label: 'Sort By', value: 'sort'},
];

const OfferPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
  }, []);

  useEffect(() => {
    if (!selectedOption) {
      setFilteredData(data);
    }
  }, [data]);

  const applySortOrFilter = option => {
    let newData = [...data];
    setSelectedOption(option.value);
    setDropdownVisible(false);

    if (option.value === 'filter') {
      switch (option.label) {
        case 'Cost Low to High':
          newData.sort((a, b) => a.price - b.price);
          break;
        case 'Cost High to Low':
          newData.sort((a, b) => b.price - a.price);
          break;
        case 'Rating High to Low':
          newData.sort((a, b) => b.rating - a.rating);
          break;
        case 'A to Z':
          newData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Z to A':
          newData.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    } else if (option.value === 'sort') {
      applySortOrFilter({label: option.label, value: 'filter'});
    }

    setFilteredData(newData);
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
      onPress={() => navigation.navigate('FoodDetail', {item})}>
      <View style={styles.verticalImageContainer}>
        <Image style={styles.verticalImage} source={{uri: item.image}} />
      </View>
      <View style={styles.verticalDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.foodPrice}>₹ {item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Icon name="star" color={'#fff'} size={12} />
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
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.head}>
          <View>
            <Text style={styles.text}>Offer</Text>
            <Text style={styles.you}>Elevate your dining experience today</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          style={styles.filterBar}
          showsHorizontalScrollIndicator={false}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterButton,
                selectedOption === option.value ? styles.selectedButton : null,
              ]}
              onPress={() =>
                option.value === 'sort' || option.value === 'filter'
                  ? setDropdownVisible(!isDropdownVisible)
                  : applySortOrFilter(option)
              }>
              <View style={styles.filterWithIcon}>
                <Text
                  style={[
                    styles.filterText,
                    selectedOption === option.value
                      ? styles.selectedText
                      : null,
                  ]}>
                  {option.label}
                </Text>
                <Icon
                  name={option.value === 'filter' ? 'filter-outline' : 'sort'}
                  size={16}
                  color={selectedOption === option.value ? '#fff' : '#000'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          {[
            'Cost Low to High',
            'Cost High to Low',
            'Rating High to Low',
            'A to Z',
            'Z to A',
          ].map(sortType => (
            <TouchableOpacity
              key={sortType}
              style={styles.dropdownItem}
              onPress={() =>
                applySortOrFilter({label: sortType, value: 'sort'})
              }>
              <Text style={styles.dropdownText}>{sortType}</Text>
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
    padding: 16,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  filterBar: {
    flexDirection: 'row',
    paddingRight: 16,
    marginBottom: 10,
    paddingLeft: 16,
    marginTop: 8,
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
    marginRight: 3,
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
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
    marginVertical: 2,
  },
});

export default OfferPage;
