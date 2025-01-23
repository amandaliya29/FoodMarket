import React, {useState, useRef, useCallback} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Text,
  SafeAreaView,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import AdminCategories from './addItemAdminTab/AdminCategories';
import AdminAddItem from './addItemAdminTab/AdminAddItem';
import AdminOffers from './addItemAdminTab/AdminOffers';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addSearchHistory,
  clearHistory,
  removeSearchHistoryItem,
} from '../redux/cartSlice';
import {foodList} from '../foodlist';
import {TextInput} from 'react-native';

const AddItemScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [routes] = useState([
    {key: 'Categories', title: 'Categories'},
    {key: 'Item', title: 'Products'},
    {key: 'Offers', title: 'Offers'},
  ]);
  const tabTitleWidths = useRef([]);
  const fixedIndicatorWidth = 40;

  const dispatch = useDispatch();
  const width = useWindowDimensions().width;
  const [query, setQuery] = useState('');
  const searchHistory = useSelector(state => state.cart.searchHistory);

  useFocusEffect(
    useCallback(() => {
      setQuery('');
    }, []),
  );

  const filteredFoodList = foodList.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleItemPress = item => {
    Keyboard.dismiss();
    dispatch(addSearchHistory(item.name));
    navigation.navigate('FoodDetail', {item});
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
        <Image source={{uri: item.image}} style={styles.foodImage} />
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleTextLayout = (event, i) => {
    const {width} = event.nativeEvent.layout;
    tabTitleWidths.current[i] = width;
  };

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((_, i) => i);
    const tabWidth = layout.width / props.navigationState.routes.length;

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          const color = index === i ? '#020202' : '#8D92A3';
          const fontWeight = index === i ? 700 : 400;
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={[{opacity}, {color}, {fontWeight}]}
                onLayout={event => handleTextLayout(event, i)}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}

        <Animated.View
          style={[
            styles.indicator,
            {
              width: fixedIndicatorWidth,
              transform: [
                {
                  translateX: props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => {
                      const titleWidth = tabTitleWidths.current[i] || 0;
                      const offsetX = (tabWidth - fixedIndicatorWidth) / 2;
                      return i * tabWidth + offsetX;
                    }),
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    Categories: AdminCategories,
    Item: AdminAddItem,
    Offers: AdminOffers,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>Add Products</Text>
          <Text style={styles.letsGetSome}>Let's get some foods</Text>
        </View>
      </View>
      <View>
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
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      <TouchableOpacity
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={toggleModal}>
        <View
          style={{
            width: 55,
            height: 55,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EB0029',
          }}>
          <Icon name="add-outline" size={30} color={'#fff'} />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                toggleModal();
                navigation.navigate('AdminAddCategory');
              }}>
              <Text style={styles.modalButtonText}>Add Category</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                toggleModal();
                navigation.navigate('AdminAddProduct', {update: false});
              }}>
              <Text style={styles.modalButtonText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                toggleModal();
                // Handle Add Offers Action
              }}>
              <Text style={styles.modalButtonText}>Add Offers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                toggleModal();
                // Handle Add Offers Action
              }}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
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
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddItemScreen;

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
  letsGetSome: {
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
  tabBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 0,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: '#020202',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  modalButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: '#eb0029',
  },
  modalButtonText: {
    color: '#eb0029',
    fontSize: 16,
    textAlign: 'center',
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
