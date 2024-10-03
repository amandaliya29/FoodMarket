import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const FoodMarket = () => {
  const DATA = [
    {
      id: 1,
      name: 'Rate App',
    },
    {
      id: 2,
      name: 'Help Center',
    },
    {
      id: 3,
      name: 'Privacy & Policy',
    },
    {
      id: 4,
      name: 'Terms & Conditions',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              console.warn(item.name);
            }}
            style={styles.itemContainer}>
            <View style={styles.row}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Icon name="angle-right" size={20} color="#000" />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default FoodMarket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  itemContainer: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#020202',
  },
});
