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
import {useNavigation} from '@react-navigation/native';

const Categories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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
        products: item.products,
      }));
      setData(categories);
    } catch (error) {
      showToastWithGravityAndOffset(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetList();
  }, []);

  const renderCategory = (category, index) => (
    <TouchableOpacity
      onPress={() => {
        if (category) {
          navigation.navigate('CategoriesDetail', {category});
        }
      }}
      key={category?.id || `placeholder-${index}`}
      style={styles.categoryItem}
      activeOpacity={0.7}>
      {loading || !category ? (
        <View style={styles.placeholder}>
          <View style={styles.placeholderImage} />
          <View style={styles.placeholderText} />
        </View>
      ) : (
        <View style={styles.categoryContent}>
          <Image
            source={{uri: `${IMAGE_API}/${category.image}`}}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const groupedCategories = [];
  const itemsToShow = loading ? 16 : data.length;
  for (let i = 0; i < itemsToShow; i += 2) {
    groupedCategories.push(loading ? [null, null] : data.slice(i, i + 2));
  }

  const renderRow = ({item}) => (
    <View style={styles.column}>
      {item.map((category, index) => renderCategory(category, index))}
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
  categoryContent: {
    alignItems: 'center',
    justifyContent: 'center',
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
  placeholder: {
    alignItems: 'center',
    marginVertical: 5,
  },
  placeholderImage: {
    width: 80,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    marginBottom: 5,
  },
  placeholderText: {
    width: 60,
    height: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 6,
  },
});

export default Categories;
