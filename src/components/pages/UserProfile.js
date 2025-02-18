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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import UserAvatar from '../pages/UserAvatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IMAGE_API} from '@env';
const UserProfile = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [phone, setPhone] = useState();
  const [Email, setEmail] = useState();
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetail] = useState(null);
  const [userName, setUserName] = useState('');

  const fetchUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        setUserDetail(parsedDetails);
        setImageUri(
          parsedDetails.data &&
            parsedDetails.data.user &&
            parsedDetails.data.user.avatar
            ? `${IMAGE_API}/${parsedDetails.data.user.avatar}`
            : null,
        );
        setUserName(parsedDetails.data.user.name);
        setEmail(parsedDetails.data.user.email);
      }
    } catch (error) {
      console.warn('Failed to load user details', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    requestCameraPermission();
    imageUri;
    IMAGE_API;
  }, []);

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

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Camera permission error:', err);
        return false;
      }
    }
    return true;
  };

  const handleOpenCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
        } else if (response.errorMessage) {
        } else if (response.assets && response.assets.length > 0) {
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
          <Text style={styles.text}>Profile</Text>
          <Text style={styles.letsGetSome}>Make sure it's valid</Text>
        </View>
      </View>
      <View style={styles.centerContent}>
        <View
          style={[
            styles.formBox,
            {
              width: width >= 400 ? 500 : width - 20,
            },
          ]}>
          <View>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={handleImagePress}>
                {imageUri ? (
                  <Image
                    alt="image"
                    source={{uri: imageUri}}
                    style={styles.defaultAvatar}
                    accessibilityLabel="user"
                  />
                ) : (
                  <UserAvatar size={100} name={userName || 'Food Market'} />
                )}
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 12, marginBottom: 16}}>
              <Text style={styles.title}>Name</Text>
              <TextInput
                value={userName}
                onChangeText={setUserName}
                placeholder="Type your Name"
                placeholderTextColor={'grey'}
                style={styles.input}
              />
            </View>
            <View style={{marginBottom: 16}}>
              <Text style={styles.title}>Email</Text>
              <TextInput
                value={Email}
                onChangeText={setEmail}
                placeholder="Type your Email"
                placeholderTextColor={'grey'}
                editable={false}
                style={styles.input}
              />
            </View>
            <View style={{marginBottom: 16}}>
              <Text style={styles.title}>Phone No</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Type your phone number"
                keyboardType="phone-pad"
                placeholderTextColor={'grey'}
                style={styles.input}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
              style={[styles.modalButton, {backgroundColor: 'red'}]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserProfile;

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
  avatarContainer: {alignItems: 'center', marginBottom: 16},
  defaultAvatar: {width: 110, height: 110, borderRadius: 60},
  head: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
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
    alignItems: 'center',
  },
  modalButton: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: '#eb0029',
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  centerContent: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
