import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import TagInput from './TagInput';
import axiosInstance from '../../axios/axiosInstance';
import ToggleSwitch from 'toggle-switch-react-native';

const AdminAddProduct = () => {
  const route = useRoute();
  const {item} = route.params || {};
  const update = route.params?.update;
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [description, setDescription] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [price, setPrice] = useState();
  const [rate, setRate] = useState();
  const [stock, setStock] = useState();
  const [is_hot, setIs_hot] = useState(!!item?.is_hot);
  const [category, setCategory] = useState([]);
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const [userDetails, setUserDetail] = useState(null);
  const [name, setName] = useState('');
  const [categoryList, setCategoryList] = useState();

  //   const fetchUserDetails = async () => {
  //     try {
  //       const userDetails = await AsyncStorage.getItem('userDetails');
  //       if (userDetails) {
  //         const parsedDetails = JSON.parse(userDetails);
  //         setUserDetail(parsedDetails);
  //         setImageUri(
  //           parsedDetails.data &&
  //             parsedDetails.data.user &&
  //             parsedDetails.data.user.avatar
  //             ? `${IMAGE_API}/${parsedDetails.data.user.avatar}`
  //             : null,
  //         );
  //         setUserName(parsedDetails.data.user.name);
  //         setEmail(parsedDetails.data.user.email);
  //       }
  //     } catch (error) {
  //       console.warn('Failed to load user details', error);
  //     }
  //   };
  const handleToggle = async isOn => {
    setIs_hot(!!isOn);

    // try {
    //   await axiosInstance.patch(`category/update/${item.id}`, {
    //     is_hot: isOn ? 1 : 0,
    //   });
    //   showToastWithGravityAndOffset('Hot status updated successfully.');
    // } catch (error) {
    //   showToastWithGravityAndOffset(
    //     error.response?.data?.message || 'Failed to update hot status.',
    //   );
    // }
  };
  const CategoryListDisplay = async () => {
    try {
      const response = await axiosInstance.get('category/list');
      const categories = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        description: item.description,
        products: item.products,
        ingredients: item.ingredients,
        is_hot: !!item.is_hot,
      }));
      setCategoryList(categories);
    } catch (error) {
      showToastWithGravityAndOffset(error.response.data.message);
    }
  };

  useEffect(() => {
    // fetchUserDetails();
    CategoryListDisplay();
    imageUri;
  }, []);

  useEffect(() => {
    if (route.params.update === true) {
      if (item) {
        setName(item.name || '');
        setImageUri(item.image || '');
        setPrice(item.price?.toString() || '');
        setStock(item.stock?.toString() || '');
        setIngredients(item.ingredients || []);
        setDescription(item.description || '');
        setCategory(item.category_id || '');
        setIs_hot(!!item.is_hot || false);
      }
    } else {
      setName('');
      setImageUri('');
      setPrice('');
      setStock('');
      setIngredients([]);
      setDescription('');
      setCategory('');
      setIs_hot(false);
    }
  }, [item, update]);

  const handleOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
        setModalVisible(false);
      },
    );
  };

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
        setModalVisible(false);
      },
    );
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

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
          <Text style={styles.text}>
            {item ? 'Update Products' : 'Add Products'}
          </Text>
          <Text style={styles.letsGetSome}>Make sure it's valid</Text>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.centerContent}>
          <View
            style={[
              styles.formBox,
              {
                width: width >= 400 ? 500 : width - -12,
              },
            ]}>
            <View>
              <TouchableOpacity
                onPress={handleImagePress}
                style={styles.avatarContainer}>
                {imageUri ? (
                  <Image
                    source={{uri: imageUri}}
                    style={styles.defaultAvatar}
                  />
                ) : (
                  <View>
                    <Icon2
                      name="image"
                      size={50}
                      color={'#ed0029'}
                      style={{alignSelf: 'center'}}
                    />
                    <Text style={[{marginTop: 10}, styles.title]}>
                      Upload food products image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={{marginTop: 12, marginBottom: 16}}>
                <Text style={styles.title}>Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Type your category name"
                  placeholderTextColor={'grey'}
                  style={styles.input}
                />
              </View>
              <View style={{marginTop: 12, marginBottom: 16}}>
                <Text style={styles.title}>Category</Text>
                <View style={[styles.input, {padding: 0}]}>
                  <RNPickerSelect
                    value={category}
                    onValueChange={value => setCategory(value)}
                    items={
                      categoryList
                        ? categoryList.map(item => ({
                            label: item.name,
                            value: item.id,
                          }))
                        : []
                    }
                    placeholder={{
                      label: 'Select a category...',
                      value: null,
                      color: 'black',
                    }}
                    style={{
                      inputAndroid: {
                        fontSize: 14,
                        color: 'black',
                      },
                      inputIOS: {
                        fontSize: 14,
                        color: 'black',
                      },
                      placeholder: {
                        fontSize: 14,
                        color: 'grey',
                      },
                    }}
                  />
                </View>
              </View>

              <View style={{marginBottom: 16}}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                  style={styles.input}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter description here"
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
              <View style={{marginBottom: 16}}>
                <Text style={styles.title}>Ingredients</Text>
                <TagInput
                  maxTags={10}
                  duplicate={false}
                  initialTags={ingredients}
                  onChange={setIngredients}
                />
              </View>
              <View style={{marginBottom: 16}}>
                <Text style={styles.title}>Price</Text>
                <View style={styles.inputPriceContainer}>
                  <Text style={styles.prefix}>₹</Text>
                  <TextInput
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="number-pad"
                    placeholder="Type your price"
                    placeholderTextColor={'grey'}
                    // style={styles.input}
                  />
                </View>
              </View>

              <View style={{marginBottom: 16}}>
                <Text style={styles.title}>Stock</Text>
                <TextInput
                  value={stock}
                  onChangeText={setStock}
                  placeholder="Type your stock"
                  placeholderTextColor={'grey'}
                  style={styles.input}
                />
              </View>
            </View>
            <View style={{marginTop: 12, marginBottom: 16}}>
              <ToggleSwitch
                isOn={!!is_hot}
                onColor="#eb0029"
                offColor="#ccc"
                label="Hot"
                labelStyle={{
                  color: '#333',
                  fontWeight: '500',
                  marginLeft: 24,
                }}
                size="small"
                onToggle={isOn => handleToggle(isOn)}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleOpenGallery}>
              <Text style={styles.modalButtonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleOpenCamera}>
              <Text style={styles.modalButtonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminAddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
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
  avatarContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: 345,
    height: 200,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: '#fcfcfc',
    backgroundColor: '#ccc',
    objectFit: 'cover',
  },
  defaultAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    objectFit: 'contain',
  },
  head: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  formBox: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    margin: 6,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 16,
    borderColor: 'rgba(2, 2, 2, 0.28)',
    color: 'black',
  },
  title: {
    fontSize: 16,
    color: '#020202',
    textAlign: 'left',
    marginLeft: 16,
    fontWeight: '500',
  },
  signInButton: {
    borderRadius: 8,
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#eb0029',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    gap: 2,
  },
  modalButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: '#eb0029',
  },
  modalButtonText: {
    color: '#eb0029',
    fontSize: 16,
    textAlign: 'center',
  },
  centerContent: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPriceContainer: {
    marginTop: 6,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(2, 2, 2, 0.28)',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  prefix: {
    fontSize: 18,
    color: '#333',
    marginRight: 5,
  },
  inputPrice: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: 40,
  },
});
