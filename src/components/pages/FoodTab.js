import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {foodList} from '../foodlist';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

const filters = [
  {id: '1', label: 'Sort By', type: 'sort'},
  {id: '2', label: 'New on Food Market', type: 'filter', value: 'new'},
  {id: '3', label: 'Rating 4.0+', type: 'filter', value: 'rating4Plus'},
  {id: '4', label: 'Offers', type: 'filter', value: 'offers'},
  {id: '5', label: '₹300 - ₹600', type: 'filter', value: 'price300to600'},
  {id: '6', label: 'Less than ₹300', type: 'filter', value: 'priceLess300'},
];

const FoodTab = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(foodList);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const applyFilter = filter => {
    let newData = [...foodList];

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
      }
    } else if (filter.type === 'filter') {
      switch (filter.value) {
        case 'new':
          newData = newData.filter(item => item.isNew);
          break;
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
          newData = newData.filter(item => item.hasOffers);
          break;
      }
    }

    setFilteredData(newData);
    setSelectedFilter(filter.value);
    setDropdownVisible(false);
  };

  const renderVerticalItem = ({item}) => (
    <TouchableOpacity
      key={item.id.toString()}
      style={styles.verticalBox}
      onPress={() => {
        navigation.navigate('FoodDetail', {item});
      }}>
      <View style={styles.verticalImageContainer}>
        <Image style={styles.verticalImage} source={{uri: item.image}} />
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
          <Text style={styles.foodPrice}>₹ {item.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            <Icon2 name="star" color={'#fff'} size={12} />
          </View>
        </View>
        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.detailText}>
            {item.detail}
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
      <ScrollView
        horizontal
        style={styles.filterBar}
        showsHorizontalScrollIndicator={false}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={
              filter.label === 'Sort By'
                ? [
                    styles.filterButton,
                    isDropdownVisible ? styles.selectedButton : null,
                  ]
                : styles.filterButton
            }
            onPress={() => {
              if (filter.label === 'Sort By') {
                setDropdownVisible(!isDropdownVisible);
              } else {
                applyFilter(filter);
              }
            }}>
            <View style={styles.filterWithIcon}>
              <Text
                style={
                  filter.label === 'Sort By'
                    ? [
                        styles.filterText,
                        isDropdownVisible ? styles.selectedText : null,
                      ]
                    : styles.filterText
                }>
                {filter.label}
              </Text>
              {filter.label === 'Sort By' && (
                <Icon2
                  name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={
                    filter.label === 'Sort By' && isDropdownVisible
                      ? '#fff'
                      : '#000'
                  }
                  style={styles.icon}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => applyFilter({type: 'sort', value: 'costLowToHigh'})}>
            <Text style={styles.dropdownText}>Cost: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => applyFilter({type: 'sort', value: 'costHighToLow'})}>
            <Text style={styles.dropdownText}>Cost: High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() =>
              applyFilter({type: 'sort', value: 'ratingHighToLow'})
            }>
            <Text style={styles.dropdownText}>Rating: High to Low</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderVerticalItem}
        contentContainerStyle={styles.listContainer}
      />
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
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
});

export default FoodTab;
