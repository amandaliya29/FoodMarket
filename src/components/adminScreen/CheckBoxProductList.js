import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ToastAndroid,
  FlatList,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axiosInstance from '../axios/axiosInstance';
import {useRoute} from '@react-navigation/native';
import {IMAGE_API} from '@env';

const CheckBoxProductList = ({
  productData = [],
  update = false,
  item = {},
  onSelectProducts = () => {},
}) => {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/product/list');
        const products = response.data.data.map(({id, name}) => ({id, name}));
        setData(products);

        const validSelectedIds = productData
          .map(({id}) => id)
          .filter(id => products.some(product => product.id === id));
        setSelectedProducts(validSelectedIds);
      } catch (error) {
        ToastAndroid.show(
          error.response?.data?.message || 'Failed to fetch product list',
          ToastAndroid.SHORT,
        );
      }
    };

    fetchData();

    setFormData(
      update
        ? {
            id: item.id || '',
            name: item.name || '',
            imageUri: item.image ? `${IMAGE_API}/${item.image}` : '',
            description: item.description || '',
          }
        : {},
    );
  }, [item, update, productData]);

  const handleCheckboxChange = useCallback(
    productId => {
      const updatedSelectedProducts = selectedProducts.includes(productId)
        ? selectedProducts.filter(id => id !== productId)
        : [...selectedProducts, productId];

      setSelectedProducts(updatedSelectedProducts);

      // Pass the entire array of selected IDs to the parent component
      onSelectProducts(updatedSelectedProducts);
    },
    [selectedProducts, onSelectProducts],
  );

  const handleSave = useCallback(() => {
    if (!selectedProducts.length) {
      ToastAndroid.show(
        'Please select at least one product.',
        ToastAndroid.SHORT,
      );
      return;
    }
    ToastAndroid.show(
      `Saving selected products: ${selectedProducts.join(', ')}`,
      ToastAndroid.SHORT,
    );
  }, [selectedProducts]);

  const renderProductItem = useMemo(
    () =>
      ({item}) =>
        (
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={selectedProducts.includes(item.id)}
              onValueChange={() => handleCheckboxChange(item.id)}
            />
            <Text style={styles.label}>{item.name}</Text>
          </View>
        ),
    [selectedProducts, handleCheckboxChange],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.centerContent}>
          <View style={styles.formBox}>
            <Text style={styles.title}>Select Products</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownVisible(true)}>
              <Text style={styles.buttonText}>Choose Products</Text>
            </TouchableOpacity>

            <Modal
              visible={dropdownVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setDropdownVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderProductItem}
                    initialNumToRender={10}
                    windowSize={5}
                    removeClippedSubviews
                  />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setDropdownVisible(false)}>
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(CheckBoxProductList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: '#020202',
    marginBottom: 6,
    fontWeight: '500',
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: '#ed0029',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: '500'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {marginLeft: 8},
  modalButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#ed0029',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {color: '#fff', fontWeight: '500'},
});
