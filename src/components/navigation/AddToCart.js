import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AddToCart = ({item}) => {
  return (
    <View>
      <Text>AddToCart</Text>
      {console.warn(item)}
    </View>
  );
};

export default AddToCart;

const styles = StyleSheet.create({});
