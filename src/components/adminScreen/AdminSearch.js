import React, {useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addSearchHistory,
  clearHistory,
  removeSearchHistoryItem,
} from '../redux/cartSlice';
import axiosInstance from '../axios/axiosInstance';
import {IMAGE_API} from '@env';

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const width = useWindowDimensions().width;
  const [query, setQuery] = useState('');
  const searchHistory = useSelector(state => state.cart.searchHistory);
  const [data, setData] = useState([]);
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
      const url = query
        ? `/product/list?search=${encodeURIComponent(query)}`
        : '/product/list';

      const response = await axiosInstance.get(url);

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

  useFocusEffect(
    useCallback(() => {
      GetList();
      setQuery('');
    }, []),
  );

  const filteredFoodList = data.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleItemPress = item => {
    Keyboard.dismiss();
    dispatch(addSearchHistory(item.name));
    navigation.navigate('AdminDetail', {item});
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  const handleRemoveHistoryItem = historyItem => {
    dispatch(removeSearchHistoryItem(historyItem));
  };

  const renderHistoryItem = ({item}) => (
    <View
      style={[
        styles.historyBox,
        {flexDirection: 'row', justifyContent: 'space-between'},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Icon3 name="clock-rotate-left" size={16} color="#8d92a3" />
        <Text
          style={styles.historyItem}
          ellipsizeMode="tail"
          numberOfLines={1}
          onPress={() => setQuery(item)}>
          {item}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleRemoveHistoryItem(item)}>
        <Icon name="close" size={22} color="#8d92a3" />
      </TouchableOpacity>
    </View>
  );

  const renderFoodItem = ({item}) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.foodItem}>
        <Image
          style={styles.foodImage}
          accessibilityLabel="A beautiful landscape"
          source={{uri: `${IMAGE_API}/${item.image}`}}
        />
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>₹{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon
            name="chevron-back"
            size={24}
            color="white"
            backgroundColor="red"
            style={{borderRadius: 5}}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.text}>Search</Text>
          <Text style={styles.letsGetSome}>Let's get some foods</Text>
        </View>
      </View>
      <View style={styles.head}>
        <View style={[styles.searchContainer, {width: width - 30}]}>
          <Icon2
            name="search"
            size={24}
            color="#8d92a3"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Search FoodMarket"
            placeholderTextColor="#8d92a3"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {query === '' && (
        <View style={styles.historyContainer}>
          {searchHistory.length > 0 ? (
            <>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Search History</Text>
                <TouchableOpacity onPress={handleClearHistory}>
                  <Text style={styles.clearHistoryButton}>Clear All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderHistoryItem}
              />
            </>
          ) : (
            <View style={styles.centeredContainer}>
              <Text style={styles.placeholderText}>Search your item</Text>
            </View>
          )}
        </View>
      )}

      {query !== '' && (
        <>
          {filteredFoodList.length > 0 ? (
            <FlatList
              data={filteredFoodList}
              keyExtractor={item => item.id.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={renderFoodItem}
            />
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  nameHead: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  head: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 14,
  },

  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  letsGetSome: {
    fontSize: 13,
    fontWeight: '300',
    color: '#8d92a3',
  },
  head: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#8d92a3',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    color: 'black',
  },
  historyContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearHistoryButton: {
    color: 'red',
    fontSize: 14,
  },
  historyBox: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
  },
  historyItem: {
    paddingLeft: 10,
    fontSize: 14,
    color: 'black',
  },
  removeIconContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  foodItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  foodInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  foodName: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 14,
    color: '#333',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
});
