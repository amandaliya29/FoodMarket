import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  useWindowDimensions,
  Modal,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axios/axiosInstance';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const {width, height} = useWindowDimensions();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
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

  const onSignInHandler = async () => {
    if (validate()) {
      try {
        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        const response = await axiosInstance.post('/login', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const userDetails = response.data;

        await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
        const isAdmin = userDetails.data.user.is_admin === 1;

        showToastWithGravityAndOffset(response.data.message);

        navigation.navigate(isAdmin ? 'AdminHomeScreen' : 'TabNavigation');
      } catch (error) {
        console.warn(error);

        showToastWithGravityAndOffset(error.response.data.message);
      }
    } else {
      showToastWithGravityAndOffset('Please fill all fields correctly');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>Sign In</Text>
          <Text style={styles.letsGetSome}>Find your best ever meal</Text>
        </View>
      </View>

      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          style={[styles.formBox, {width: width >= 400 ? 500 : width - 20}]}>
          <View>
            <View style={{marginBottom: 8}}>
              <Text style={styles.title}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Type your email address"
                placeholderTextColor={'grey'}
                color={'black'}
                style={styles.input}
              />
              <Text style={styles.errorText}>{emailError}</Text>
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
                  <Icon
                    name={hidePass ? 'eye-slash' : 'eye'}
                    size={20}
                    color="grey"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.errorText}>{passwordError}</Text>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={onSignInHandler}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Reset Password</Text>
                <Text style={styles.modalMessage}>
                  Please check your email to reset your password.
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={'grey'}
                  style={[styles.input, {width: '100%', marginBottom: 16}]}
                />
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleForgotPassword}>
                  <Text style={{color: 'white'}}>Send Reset Link</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={{color: 'black'}}>Close</Text>
                </TouchableOpacity>
                <View style={{height: 50}} />
              </View>
            </View>
          </Modal> */}

          {/* <View>
            <Text style={styles.orContinueWith}>- OR Continue with -</Text>
          </View>
          <View style={styles.socialContainer}>
            <Pressable style={styles.googleButton}>
              <Image
                source={require('../assets/google1.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Google</Text>
            </Pressable>
          </View> */}

          {/* <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginHorizontal: 60,
              width: 200,
              marginVertical: 20,
              marginBottom: 24,
            }}>
            <Pressable
              onPress={() => console.warn('google')}
              style={styles.google}>
              <View style={styles.google1Parent}>
                <Image
                  style={styles.google1Icon}
                  resizeMode="cover"
                  source={require('../assets/google1.png')}
                />
                <Text style={styles.google1}>Google</Text>
              </View>
            </Pressable>
             <Pressable
              onPress={() => console.warn('facebook')}
              style={styles.google}>
              <View style={styles.google1Parent}>
                <Image
                  style={styles.google1Icon}
                  resizeMode="cover"
                  source={require('../assets/facebook1.png')}
                />
                <Text style={styles.google1}>Facebook</Text>
              </View>
            </Pressable> 
          </View> */}

          <View style={styles.createAnAccount}>
            <Text style={[styles.createAnAccount1, styles.signUpTypo]}>
              Create An Account
            </Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.signUp, styles.signUpTypo]}>Sign Up</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 8, backgroundColor: '#fff'},
  text: {fontSize: 20, fontWeight: '500', color: 'black'},
  letsGetSome: {fontSize: 13, fontWeight: '300', color: '#8d92a3'},
  head: {
    padding: 16,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  formBox: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  inputWrapper: {marginBottom: 16},
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
  passwordContainer: {margin: 6, marginHorizontal: 16, position: 'relative'},
  inputWithIcon: {
    padding: 10,
    paddingRight: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(2, 2, 2, 0.28)',
    color: 'black',
  },
  iconStyle: {position: 'absolute', right: 20, top: '30%'},
  signInButton: {
    borderRadius: 8,
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#eb0029',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    color: '#eb0029',
    textDecorationLine: 'underline',
    fontSize: 12,
    marginBottom: 24,
  },
  orContinueWith: {
    fontSize: 12,
    fontWeight: '300',
    color: '#575757',
    textAlign: 'center',
  },
  socialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 50,
    backgroundColor: 'rgba(235, 0, 41, 0.1)',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  googleIcon: {width: 24, height: 24, marginRight: 10},
  googleButtonText: {
    fontSize: 12,
    color: '#575757',
    textAlign: 'center',
    fontWeight: '500',
  },
  google1Icon: {width: 24, height: 24},
  google1: {
    fontSize: 12,
    color: '#575757',
    textAlign: 'center',
    fontWeight: '500',
  },
  google1Parent: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  google: {
    borderRadius: 50,
    backgroundColor: 'rgba(235, 0, 41, 0.1)',
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  signUpTypo: {textAlign: 'center', fontSize: 14},
  createAnAccount1: {color: '#575757'},
  signUp: {fontWeight: 'bold', color: '#eb0029'},
  createAnAccount: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 18, fontWeight: '500', marginBottom: 12},
  modalMessage: {fontSize: 14, marginBottom: 12, color: '#575757'},
  resetButton: {
    backgroundColor: '#eb0029',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 16,
  },
});
