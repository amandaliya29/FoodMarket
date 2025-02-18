import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from './axios/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const forgotPassword = async () => {
    if (!email.trim()) {
      showToastWithGravityAndOffset('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/forgot-password', {email});
      showToastWithGravityAndOffset('Check your email to reset your password.');
      navigation.navigate('SignIn');
    } catch (error) {
      showToastWithGravityAndOffset(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    if (!loading) {
      forgotPassword();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>Forgot Password</Text>
          <Text style={styles.letsGetSome}>Find your best ever meal</Text>
        </View>
      </View>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[styles.formBox, {width: width >= 400 ? 500 : width - 20}]}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="grey"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetPassword}
              disabled={loading}>
              <Text style={styles.resetButtonText}>
                {loading ? 'Sending...' : 'Send Email'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    marginBottom: '50%',
  },
  formBox: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#020202',
    textAlign: 'left',
    marginLeft: 16,
    fontWeight: '500',
  },
  input: {
    margin: 6,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 16,
    borderColor: 'rgba(2, 2, 2, 0.28)',
    marginBottom: 16,
  },
  resetButton: {
    borderRadius: 8,
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#eb0029',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 12,
    color: '#575757',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#eb0029',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  passwordContainer: {margin: 6, marginHorizontal: 16, position: 'relative'},
  inputWithIcon: {
    padding: 10,
    paddingRight: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(2, 2, 2, 0.28)',
  },
  iconStyle: {position: 'absolute', right: 20, top: '30%'},
});

export default ForgotPassword;
