import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: 1,
      name: 'Order',
      screen: 'Order',
    },
    // {
    //   id: 2,
    //   name: 'Edit Profile',
    // },
    // {
    //   id: 3,
    //   name: 'Home Address',
    // },
    // {
    //   id: 4,
    //   name: 'Security',
    // },
    // {
    //   id: 5,
    //   name: 'Payments',
    // },
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

export default Account;

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
