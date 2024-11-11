import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrderTabBar from './orderListTab/OrderTabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
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

        <View>
          <Text style={styles.text}>Your Order</Text>
          <Text style={styles.letsGetSome}>wait for the best meal</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <OrderTabBar />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
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
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  backButton: {
    marginRight: 16,
  },
});
