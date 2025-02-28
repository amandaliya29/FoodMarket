import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ImagePickerComponent from './foodTab/profileImg/ImagePickerComponent';
import axiosInstance from '../components/axios/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [name, setName] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [imageDetail, setImageDetail] = useState({});
  const {width} = useWindowDimensions();

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const validate = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!phone) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setEmailError('Enter a valid 10-digit phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== conformPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!name) {
      setNameError('Full Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    return isValid;
  };

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const onSubmitHandler = async () => {
    if (validate()) {
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone_no', phone);
        formData.append('name', name);
        formData.append('password_confirmation', conformPassword);

        if (imageUri) {
          formData.append('avatar', {
            uri: imageUri,
            name: imageDetail.fileName,
            type: imageDetail.type,
          });
        }

        const response = await axiosInstance.post('/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const userDetails = response.data;

        await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

        showToastWithGravityAndOffset(response.data.message);

        navigation.navigate('TabNavigation');
      } catch (error) {
        showToastWithGravityAndOffset(error.response.data.message);
      }
    } else {
      showToastWithGravityAndOffset('Please fill all fields correctly');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>Sign Up</Text>
        <Text style={styles.letsGetSome}>Register and eat</Text>
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 10}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={[styles.formBox, {width: width >= 400 ? 500 : width - 20}]}>
            <ImagePickerComponent
              imageUri={imageUri}
              setImageUri={setImageUri}
              setFileDetails={setImageDetail}
            />

            <View style={{marginTop: 8, marginBottom: 8}}>
              <Text style={styles.title}>Full Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Type your full name"
                placeholderTextColor={'grey'}
                style={styles.input}
              />
              <Text style={styles.errorText}>{nameError}</Text>
            </View>

            <View style={{marginBottom: 8}}>
              <Text style={styles.title}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'grey'}
                placeholder="Type your email address"
                style={styles.input}
              />
              <Text style={styles.errorText}>{emailError}</Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text style={styles.title}>phone no</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor={'grey'}
                placeholder="Type your phone number"
                style={styles.input}
              />
              <Text style={styles.errorText}>{phoneError}</Text>
            </View>

            <View style={{marginBottom: 8}}>
              <Text style={styles.title}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={hidePass}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Type your password"
                  placeholderTextColor={'grey'}
                  style={styles.inputWithIcon}
                />
                <TouchableOpacity
                  onPress={() => setHidePass(!hidePass)}
                  style={styles.iconStyle}>
                  <Icon2
                    name={hidePass ? 'eye-slash' : 'eye'}
                    size={20}
                    color="grey"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.errorText}>{passwordError}</Text>
            </View>

            <View style={{marginBottom: 8}}>
              <Text style={styles.title}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={hideConfirmPass}
                  value={conformPassword}
                  onChangeText={setConformPassword}
                  placeholder="Retype your password"
                  placeholderTextColor={'grey'}
                  style={styles.inputWithIcon}
                />
                <TouchableOpacity
                  onPress={() => setHideConfirmPass(!hideConfirmPass)}
                  style={styles.iconStyle}>
                  <Icon2
                    name={hideConfirmPass ? 'eye-slash' : 'eye'}
                    size={20}
                    color="grey"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={onSubmitHandler}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createAnAccount}>
            <Text style={styles.createAnAccount1}>
              I Already Have an Account
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUp}>Log in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  formBox: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10,
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
  head: {
    padding: 16,
    paddingVertical: 2,
    marginBottom: 16,
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
  passwordContainer: {
    margin: 6,
    marginHorizontal: 16,
    position: 'relative',
  },
  inputWithIcon: {
    padding: 10,
    paddingRight: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(2, 2, 2, 0.28)',
    color: 'black',
  },
  iconStyle: {
    position: 'absolute',
    right: 20,
    top: '30%',
  },
  signInButton: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: '#eb0029',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAnAccount: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 8,
    marginBottom: 16,
  },
  signUp: {
    fontWeight: 'bold',
    color: '#eb0029',
  },
  createAnAccount1: {
    color: '#575757',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 16,
  },
});

export default SignUp;
