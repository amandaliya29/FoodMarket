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
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IMAGE_API} from '@env';
import axiosInstance from '../../axios/axiosInstance';
const AdminAddCategory = () => {
  const route = useRoute();
  const {item} = route.params || {};
  const update = route.params?.update;
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [description, setDescription] = useState();
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (route.params?.update === true) {
      if (item) {
        setId(item.id || '');
        setName(item.name || '');
        setImageUri(item.image ? `${IMAGE_API}/${item.image}` : '');
        setDescription(item.description || '');
      }
    } else {
      setId('');
      setName('');
      setImageUri();
      setDescription('');
    }
  }, [item, update]);
  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const uploadImage = async () => {
    if (!imageUri || imageUri.startsWith('http')) return imageUri; // Skip if it's already a URL

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'category_image.jpg',
    });

    try {
      const response = await axiosInstance.post('category/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (response.data.status && response.data.data.url) {
        return response.data.data.url.replace(`${IMAGE_API}/`, ''); // Convert full URL to "categories/..."
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleSave = async () => {
    try {
      let finalImageUri = imageUri;

      if (imageUri && imageUri.startsWith('file://')) {
        const uploadedImageUrl = await uploadImage();
        if (uploadedImageUrl) {
          finalImageUri = uploadedImageUrl; // Use uploaded path
        } else {
          showToastWithGravityAndOffset('Image upload failed');
          return;
        }
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', finalImageUri); // Use the final formatted image path

      if (update) {
        formData.append('id', id);
        await axiosInstance.post('category/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showToastWithGravityAndOffset('Category updated successfully');
      } else {
        await axiosInstance.post('category/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showToastWithGravityAndOffset('Category added successfully');
      }

      navigation.goBack();
    } catch (error) {
      console.log('Error:', error.response?.data);
      showToastWithGravityAndOffset(
        error.response?.data?.message || 'Failed to save category.',
      );
    }
  };

  useEffect(() => {
    IMAGE_API;
    imageUri;
    item;
  }, []);

  const handleOpenGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImageUri = response.assets[0].uri;
        setImageUri(newImageUri);
      }
      setModalVisible(false);
    });
  };

  const handleOpenCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImageUri = response.assets[0].uri;
        setImageUri(newImageUri);
      }
      setModalVisible(false);
    });
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
          <Text style={styles.text}>Add Categories</Text>
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
                width: width >= 400 ? 500 : width - 20,
              },
            ]}>
            <View>
              <TouchableOpacity
                onPress={handleImagePress}
                style={styles.avatarContainer}>
                {imageUri ? (
                  <Image
                    source={{uri: `${imageUri}`}}
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
                      Upload category image
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
            </View>
            <View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSave}>
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

export default AdminAddCategory;

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
    width: 325,
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
    marginBottom: 20,
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
});
