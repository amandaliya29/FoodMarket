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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IMAGE_API} from '@env';
import axiosInstance from '../../axios/axiosInstance';
import CheckBoxProductList from '../CheckBoxProductList';

const AdminAddOffer = () => {
  const route = useRoute();
  const {item} = route.params || {};
  const update = route.params?.update;
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (update && item) {
      setId(item.id || '');
      setImageUri(item.banner ? `${IMAGE_API}/${item.banner}` : '');
    } else {
      setId('');
      setImageUri('');
    }
  }, [item, update]);

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/offer/get/${item.id}`);
      const products = response.data.data.products.map(({id, name}) => ({
        id,
        name,
      }));
      setData(products);
    } catch (error) {
      showToast(error.response?.data?.message || 'Error fetching data');
    }
  };

  const uploadImage = async () => {
    if (!imageUri || imageUri.startsWith('http')) return imageUri;

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'category_image.jpg',
    });

    try {
      const {data} = await axiosInstance.post('category/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (data.status && data.data.url) {
        return data.data.url.replace(`${IMAGE_API}/`, '');
      }
      throw new Error('Image upload failed');
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
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
      formData.append('id', id);
      formData.append('image', finalImageUri);

      await axiosInstance.post('category/save', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      showToast(
        update
          ? 'Category updated successfully'
          : 'Category added successfully',
      );
      navigation.goBack();
    } catch (error) {
      console.log('Error:', error.response?.data);
      showToast(error.response?.data?.message || 'Failed to save category.');
    }
  };

  useEffect(() => {
    if (update) fetchData();
  }, [update]);

  const handleImagePicker = async (fromCamera = false) => {
    const options = {mediaType: 'photo'};
    const response = fromCamera
      ? await launchCamera(options)
      : await launchImageLibrary(options);

    if (response.assets?.length > 0) {
      setImageUri(response.assets[0].uri);
    }
    setModalVisible(false);
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
              <View>
                <Icon2
                  name="image"
                  size={50}
                  color="#ed0029"
                  style={styles.iconCenter}
                />
                <Text style={styles.title}>Upload Offer image</Text>
              </View>
            )}
          </TouchableOpacity>

          <CheckBoxProductList
            productData={update ? data : []}
            update={update}
            item={data}
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImagePicker(false)}>
              <Text style={styles.modalButtonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImagePicker(true)}>
              <Text style={styles.modalButtonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
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
