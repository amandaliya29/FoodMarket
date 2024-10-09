import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Quentity = ({onChangeQuantity}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    onChangeQuantity(count); // Call when count changes
  }, [count]);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <View
      style={{
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={increment}>
        <Icon
          name="plus"
          size={16}
          color={'black'}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 5,
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        />
      </TouchableOpacity>
      <Text style={{color: 'black', fontSize: 16}}>{count}</Text>
      <TouchableOpacity onPress={decrement}>
        <Icon
          name="minus"
          size={16}
          color={'black'}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 5,
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Quentity;

const styles = StyleSheet.create({});
