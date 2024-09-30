import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {foodList} from './foodlist';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import MyTabView from './navigation/MyTabView';

const HomeScreen = () => {
  const {width, height} = useWindowDimensions();

  const renderHorizontalItem = ({item, index}) => {
    const isLastItem = index === foodList.length - 1;
    return (
      <View
        key={item.id.toString()}
        style={[
          styles.box,
          isLastItem && {marginRight: 16},
          index == 0 && {marginLeft: 16},
        ]}>
        <View style={styles.imageContainer(width, height)}>
          <Image style={styles.image} source={{uri: item.image}} />
        </View>

        <View style={{paddingLeft: 12}}>
          <Text style={styles.foodName}>{item.name}</Text>
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>FoodMarket</Text>
          <Text style={styles.letsGetSome}>Let's get some foods</Text>
        </View>
        <Image
          style={styles.profileImage}
          height={50}
          width={50}
          resizeMode="contain"
          source={require('../assets/photo.png')}
        />
      </View>

      <View>
        <FlatList
          data={foodList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={item => item.id.toString()}
          renderItem={renderHorizontalItem}
          ItemSeparatorComponent={<View style={{width: 16}}></View>}
          style={styles.horizontalList}
        />
      </View>

      <MyTabView />
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
  profileImage: {
    height: 44,
    width: 44,
    borderRadius: 8,
    borderWidth: 1,
  },
  box: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    overflow: 'hidden',
    paddingBottom: 12,
    shadowColor: '#8D92A3',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 15,
    elevation: 10,
    shadowOpacity: 1,
  },
  imageContainer: (width, height) => ({
    width: 200,
    height: 140,
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 12,
  }),
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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

  horizontalList: {
    // marginBottom: 10,
    paddingBottom: 16,
  },
});

export default HomeScreen;
