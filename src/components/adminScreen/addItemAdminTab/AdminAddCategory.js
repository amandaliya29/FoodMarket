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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import UserAvatar from '../../pages/UserAvatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IMAGE_API} from '@env';
const AdminAddCategory = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [description, setDescription] = useState();
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetail] = useState(null);
  const [name, setName] = useState('');

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

  useEffect(() => {
    // fetchUserDetails();
    imageUri;
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
          <Text style={styles.text}>Add Categories</Text>
          <Text style={styles.letsGetSome}>Make sure it's valid</Text>
        </View>
      </View>
      <SafeAreaView>
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
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Type your description"
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
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
