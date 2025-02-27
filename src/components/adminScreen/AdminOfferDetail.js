import React, {useCallback, useEffect, useState} from 'react';
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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../axios/axiosInstance';
import {IMAGE_API} from '@env';

const AdminOfferDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params || {};
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

  const fetchData = async () => {
    try {
      const id = route.params;
      const response = await axiosInstance.get(`/offer/get/${id}`);
      const products = response.data.data.products.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        ingredients: item.ingredients,
        stock: item.stock,
        description: item.description,
        rating: item.rate,
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
    fetchData();
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
      </View>
    </View>
  );

  const renderVerticalItem = ({item}) => (
    <TouchableOpacity
      key={item.id.toString()}
      style={styles.verticalBox}
      onPress={() =>
        navigation.navigate('AdminDetail', {
          item: item,
          offer_params: route.params,
        })
      }>
      <View style={styles.verticalImageContainer}>
        <Image
          style={styles.verticalImage}
          source={{uri: `${IMAGE_API}/${item.image}`}}
          accessibilityLabel="A beautiful landscape"
        />
        <View style={styles.textOverlay}>
          <Text style={styles.tag} numberOfLines={1} ellipsizeMode="tail">
            {item.offer_text}
          </Text>
        </View>
      </View>
      <View style={styles.verticalDetails}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <View style={{maxWidth: 270}} numberOfLines={1} ellipsizeMode="tail">
            <Text
              style={styles.foodName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.name}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Icon name="star" color={'#fff'} size={12} />
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="brightness-percent" size={20} color={'red'} />
          <Text style={{color: 'grey', fontSize: 14, paddingLeft: 4}}>
            {item.offer_percentage}% OFF
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon2
              name="chevron-back"
              size={24}
              color="white"
              backgroundColor="red"
              style={{borderRadius: 5}}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>Offer</Text>
            <Text style={styles.you}>Elevate your dining experience today</Text>
          </View>
        </View>
      </View>
      {loading ? (
        <FlatList
          data={Array.from({length: data.length || 6})}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderPlaceholder}
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderVerticalItem}
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
  horizontalList: {
    paddingBottom: 16,
  },
  you: {
    fontSize: 13,
    fontWeight: '300',
    color: '#8d92a3',
  },
  head: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  backButton: {
    marginRight: 16,
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
    margin: 14,
    backgroundColor: 'white',
    paddingBottom: 10,
    borderColor: '#ccc',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  verticalImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  verticalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    left: 7,
    bottom: '4%',
    backgroundColor: '#EB0029',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  tag: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  verticalDetails: {
    marginHorizontal: 8,
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

export default AdminOfferDetail;
