import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Quentity from './Quentity';

const FoodDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  const [quantity, setQuantity] = useState(1);

  const price = item.price;
  const handleAddToCart = () => {
    console.warn('ADDED', item, quantity);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
        <Image source={{uri: item.image}} style={styles.foodImage} />
      </View>
      <View style={styles.box}>
        <View style={{marginTop: 26, marginHorizontal: 16, marginBottom: 12}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <View style={{flexDirection: 'row', marginTop: 6}}>
                <StarRatingDisplay
                  rating={item.rating}
                  starSize={20}
                  color={'#EB0029'}
                  starStyle={{marginRight: -2, marginLeft: 0}}
                />
                <Text style={{marginLeft: 8, color: 'grey'}}>
                  {item.rating.toFixed(1)}
                </Text>
              </View>
            </View>
            <Quentity onChangeQuantity={setQuantity} />
          </View>
        </View>
        <View style={{marginHorizontal: 16, marginBottom: 16}}>
          <Text style={styles.detail}>{item.detail}</Text>
        </View>
        <View style={{marginHorizontal: 16}}>
          <Text style={{fontSize: 16, color: '#020202'}}>Ingredients:</Text>
          <Text style={{color: 'grey'}}>{item.ingredients.join(', ')}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 10,
            marginHorizontal: 16,
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              Total Price:
            </Text>
            <Text style={{fontSize: 18, color: 'black'}}>
              ₹{item.price.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={styles.addToCart} onPress={handleAddToCart}>
            <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    zIndex: 1,
    left: 16,
  },
  foodImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  box: {
    flex: 1,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  detail: {
    fontSize: 14,
    color: 'gray',
    lineHeight: 20,
  },
  addToCart: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#eb0029',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
});
