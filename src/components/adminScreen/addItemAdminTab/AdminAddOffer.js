import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  ScrollView,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IMAGE_API} from '@env';
import axiosInstance from '../../axios/axiosInstance';
import CheckBoxProductList from '../CheckBoxProductList';

const AdminAddOffer = () => {
  const {params: {item, update} = {}} = useRoute();
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(
    item?.banner ? `${IMAGE_API}/${item.banner}` : '',
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(item?.id || '');
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Function to handle selected products from CheckBoxProductList
  // const handleSelectionChange = selectedIds => {
  //   setSelectedProducts(selectedIds);
  //   console.warn(selectedIds);
  // };

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const showToast = useCallback(message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }, []);

  useEffect(() => {
    if (update) fetchData();
  }, [update]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/offer/get/${item.id}`);
      const products = response.data.data.products.map(({id, name}) => ({
        id,
        name,
      }));
      setData(products);

      setSelectedProducts(products.map(product => product.id));
    } catch (error) {
      showToast(error.response?.data?.message || 'Error fetching data');
    }
  };

  const uploadImage = async () => {
    if (!imageUri || imageUri.startsWith('http')) return imageUri; // Skip if already uploaded

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'product_image.jpg',
    });

    try {
      const response = await axiosInstance.post('offer/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (response.data.status && response.data.data.url) {
        return response.data.data.url; // Return uploaded image URL
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleImagePicker = async (fromCamera = false) => {
    const options = {mediaType: 'photo'};
    if (fromCamera) {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        showToast('Camera permission denied');
        return;
      }
    }
    const response = fromCamera
      ? await launchCamera(options)
      : await launchImageLibrary(options);

    if (response.assets?.length > 0) {
      setImageUri(response.assets[0].uri);
    }
    setModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const finalImageUri = imageUri.startsWith('file://')
        ? await uploadImage()
        : imageUri;
      if (!finalImageUri) {
        showToast('Image upload failed');
        return;
      }

      const formData = new FormData();
      // formData.append('id', id);
      formData.append('image', finalImageUri);
      formData.append('is_active', true);
      selectedProducts.forEach(id => {
        formData.append('product_ids[]', id);
      });

      if (update) {
        formData.append('id', id);
        await axiosInstance.post('offer/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showToastWithGravityAndOffset('offer updated successfully');
      } else {
        await uploadImage();
        await axiosInstance.post('offer/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showToastWithGravityAndOffset('offer added successfully');
      }

      navigation.goBack();
    } catch (error) {
      console.warn(error);

      // console.error('Error:', error.response?.data);
      showToast(error.response?.data?.message || 'Failed to save offer.');
    }
  };

  // const handleImagePicker = async (fromCamera = false) => {
  //   const options = {mediaType: 'photo'};
  //   const response = fromCamera
  //     ? await launchCamera(options)
  //     : await launchImageLibrary(options);

  //   if (response.assets?.length > 0) {
  //     setImageUri(response.assets[0].uri);
  //   }
  //   setModalVisible(false);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Icon
            name="chevron-back"
            size={24}
            color="white"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>Add Offer</Text>
          <Text style={styles.letsGetSome}>Make sure it's valid</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.centerContent}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.avatarContainer}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={styles.defaultAvatar} />
            ) : (
              <>
                <Icon2
                  name="image"
                  size={50}
                  color="#ed0029"
                  style={styles.iconCenter}
                />
                <Text style={styles.title}>Upload Offer image</Text>
              </>
            )}
          </TouchableOpacity>

          <CheckBoxProductList
            productData={data}
            update={update}
            item={data}
            onSelectProducts={ids => setSelectedProducts(ids)}
          />

          {/* {console.warn(selectedProducts)} */}

          <TouchableOpacity style={styles.signInButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {['Open Gallery', 'Open Camera', 'Cancel'].map((option, index) => (
              <TouchableOpacity
                key={option}
                style={styles.modalButton}
                onPress={() =>
                  index === 2
                    ? setModalVisible(false)
                    : handleImagePicker(index === 1)
                }>
                <Text style={styles.modalButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminAddOffer;
const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 8, backgroundColor: '#fff'},
  text: {fontSize: 20, fontWeight: '500', color: 'black'},
  letsGetSome: {fontSize: 13, fontWeight: '300', color: '#8d92a3'},
  avatarContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: 325,
    height: 200,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: '#fcfcfc',
    backgroundColor: '#ccc',
  },
  defaultAvatar: {width: '100%', height: '100%', borderRadius: 12},
  head: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {marginRight: 16},
  iconStyle: {borderRadius: 5, backgroundColor: 'red'},
  signInButton: {
    borderRadius: 8,
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#eb0029',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {color: 'white', fontSize: 16, fontWeight: '600'},
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalButton: {padding: 16, alignItems: 'center'},
  modalButtonText: {color: '#eb0029', fontSize: 16},
  iconCenter: {alignSelf: 'center'},
});
