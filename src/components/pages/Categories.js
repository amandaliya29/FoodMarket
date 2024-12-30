import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import axiosInstance from '../axios/axiosInstance';
import {IMAGE_API} from '@env';

const Categories = () => {
  const [data, setData] = useState([]);

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const GetList = async () => {
    try {
      const response = await axiosInstance.get('category/list');
      const categories = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        description: item.description,
      }));
      setData(categories);
    } catch (error) {
      showToastWithGravityAndOffset(
        error.response?.data?.message || 'Something went wrong.',
      );
    }
  };

  useEffect(() => {
    GetList();
  }, []);

  const groupedCategories = [];
  for (let i = 0; i < data.length; i += 2) {
    groupedCategories.push(data.slice(i, i + 2));
  }

  const renderRow = ({item}) => (
    <View style={styles.column}>
      {item.map(category => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
          <Image
            source={{uri: `${IMAGE_API}/${category.image}`}}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What's on your mind?</Text>
      <FlatList
        data={groupedCategories}
        renderItem={renderRow}
        keyExtractor={(item, index) => `row-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
    color: 'grey',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  column: {
    flexDirection: 'column',
    marginHorizontal: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryImage: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'grey',
  },
});

export default Categories;