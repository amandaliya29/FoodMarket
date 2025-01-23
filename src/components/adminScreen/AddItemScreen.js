import React, {useState, useRef} from 'react';
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
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import AdminCategories from './addItemAdminTab/AdminCategories';
import AdminAddItem from './addItemAdminTab/AdminAddItem';
import AdminOffers from './addItemAdminTab/AdminOffers';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

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
});
