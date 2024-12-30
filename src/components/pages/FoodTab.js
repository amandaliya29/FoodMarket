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

// const foodData = [
//   {id: '1', name: 'Pizza', rating: 4.5, price: 299, hasOffer: true},
//   {id: '2', name: 'Burger', rating: 4.0, price: 199, hasOffer: false},
//   {id: '3', name: 'Pasta', rating: 4.2, price: 550, hasOffer: true},
//   {id: '4', name: 'Salad', rating: 3.9, price: 150, hasOffer: false},
//   {id: '5', name: 'Sushi', rating: 4.8, price: 700, hasOffer: true},
//   {id: '6', name: 'goli', rating: 3.9, price: 150, hasOffer: false},
//   {id: '7', name: 'moli', rating: 3.9, price: 150, hasOffer: false},
//   {id: '8', name: 'roli', rating: 3.9, price: 150, hasOffer: false},
//   {id: '9', name: 'toli', rating: 3.9, price: 150, hasOffer: false},
//   {id: '10', name: 'gnfkm', rating: 3.9, price: 150, hasOffer: false},
// ];

const filters = [
  {id: '1', label: 'Sort By', type: 'sort', value: 'rating'},
  {id: '2', label: 'New on Food Market', type: 'filter', value: 'new'},
  {id: '3', label: 'Rating 4.0+', type: 'filter', value: 'rating4Plus'},
  {id: '4', label: 'Offers', type: 'filter', value: 'offers'},
  {id: '5', label: '₹300 - ₹600', type: 'filter', value: 'price300to600'},
  {id: '6', label: 'Less than ₹300', type: 'filter', value: 'priceLess300'},
];

const FoodTab = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(foodList);
  const navigation = useNavigation();

  const applyFilter = filter => {
    let newData = [...foodList];

    if (filter.type === 'sort' && filter.value === 'rating') {
      newData.sort((a, b) => b.rating - a.rating);
    } else if (filter.type === 'filter') {
      if (filter.value === 'rating4Plus') {
        newData = newData.filter(item => item.rating >= 4.0);
      } else if (filter.value === 'offers') {
        newData = newData.filter(item => item.hasOffer);
      } else if (filter.value === 'price300to600') {
        newData = newData.filter(
          item => item.price >= 300 && item.price <= 600,
        );
      } else if (filter.value === 'priceLess300') {
        newData = newData.filter(item => item.price < 300);
      } else if (filter.value === 'new') {
        newData = newData.filter(item => item.id === '5');
      }
    }

    setFilteredData(newData);
    setSelectedFilter(filter.id);
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
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.verticalDetails}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>₹{item.price}</Text>
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
              selectedFilter === filter.id
                ? [styles.filterButton, styles.selectedButton]
                : styles.filterButton
            }
            onPress={() => applyFilter(filter)}>
            <Text
              style={
                selectedFilter === filter.id
                  ? [styles.filterText, styles.selectedText]
                  : styles.filterText
              }>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingRight: 10,
    marginBottom: 10,
    paddingLeft: 16,
    marginTop: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
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
  listContainer: {
    paddingBottom: 20,
    paddingRight: 16,
  },
  foodItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    marginHorizontal: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodDetails: {
    fontSize: 14,
    color: '#555',
  },
  verticalBox: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
});

export default FoodTab;
