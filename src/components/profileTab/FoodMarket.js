import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const FoodMarket = () => {
  const navigation = useNavigation();

  const DATA = [
    {
      id: 1,
      name: 'Privacy & Policy',
      screen: 'PrivacyPolicyScreen',
      icon: 'privacy-tip',
    },
    {
      id: 2,
      name: 'Terms & Conditions',
      screen: 'TermsConditionsScreen',
      icon: 'gavel',
    },
    {
      id: 3,
      name: 'Help & Support',
      screen: 'Help',
      icon: 'support-agent',
    },
    {
      id: 4,
      name: 'About Us',
      screen: 'AboutUs',
      icon: 'info',
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
              <View style={styles.iconTextRow}>
                <Icon
                  name={item.icon}
                  size={20}
                  color="#EB0029"
                  style={styles.icon}
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#000" />
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
    marginHorizontal: 16,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  itemContainer: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#020202',
  },
});
