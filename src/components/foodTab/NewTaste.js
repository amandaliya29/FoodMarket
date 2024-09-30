import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import StarRating from 'react-native-star-rating-widget';
import StarRatingDisplay from 'react-native-star-rating-widget';
import {foodList} from '../foodlist';

const NewTaste = () => {
  const renderVerticalItem = ({item}) => (
    <View key={item.id.toString()} style={styles.verticalBox}>
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
          <Text style={styles.foodPrice}>₹{item.total_price}</Text>
        </View>
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
    </View>
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

export default NewTaste;

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
