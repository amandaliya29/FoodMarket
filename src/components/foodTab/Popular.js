import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import StarRatingDisplay from 'react-native-star-rating-widget';
import {foodList} from '../foodlist';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Ionicons';

const Popular = () => {
  const navigation = useNavigation();
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
          <Text style={styles.foodPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            padding: 2,
            paddingHorizontal: 6,
            backgroundColor: 'green',
          }}>
          <Text style={{color: '#fff', fontSize: 14, paddingRight: 2}}>
            {item.rating.toFixed(1)}
          </Text>
          <Icon2 name="star" color={'#fff'} size={12} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={foodList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderVerticalItem}
      />
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  verticalBox: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalImageContainer: {
    width: 60,
    height: 60,
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
