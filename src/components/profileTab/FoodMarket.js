import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const FoodMarket = () => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: 1,
      name: 'Privacy & Policy',
      screen: 'PrivacyPolicyScreen',
    },
    {
      id: 2,
      name: 'Terms & Conditions',
      screen: 'TermsConditionsScreen',
    },
    {
      id: 3,
      name: 'Help & Support',
      screen: 'Help',
    },
    {
      id: 4,
      name: 'About Us',
      screen: 'AboutUs',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item.screen);
            }}
            style={styles.itemContainer}>
            <View style={styles.row}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Icon name="angle-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>
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
