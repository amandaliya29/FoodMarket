import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
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
  }
  return true;
};

const ImagePickerComponent = ({imageUri, setImageUri, setFileDetails}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async source => {
    const options = {mediaType: 'photo', quality: 1};

    if (source === 'gallery') {
      launchImageLibrary(options, handleImageResponse);
    } else if (source === 'camera') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        alert('Camera permission is required.');
        return;
      }
      launchCamera(options, handleImageResponse);
    }
  };

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User canceled image selection.');
    } else if (response.errorMessage) {
      console.log('Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      console.log('response', asset);

      setImageUri(asset.uri);
      setFileDetails({
        fileName: asset.fileName,
        fileSize: asset.fileSize,
        type: asset.type,
      });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageBorder}
        onPress={() => setModalVisible(true)}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="image-outline" size={24} color="#8D92A3" />
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Photo Source</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => pickImage('gallery')}>
              <Text style={styles.buttonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => pickImage('camera')}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageBorder: {
    width: 110,
    height: 110,
    borderWidth: 1.5,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#8D92A3',
    borderStyle: 'dashed',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    marginTop: 5,
    color: '#8D92A3',
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#eb0029',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#8D92A3',
    fontSize: 16,
  },
});

export default ImagePickerComponent;
