import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import TabNavigation from './navigation/TabNavigation';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true); // Manage password visibility

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>Sign In</Text>
          <Text style={styles.letsGetSome}>Find your best ever meal</Text>
        </View>
      </View>

      <View>
        <View style={{marginBottom: 16}}>
          <Text style={styles.title}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Type your email address"
            style={styles.input}
          />
        </View>

        <View style={{marginBottom: 16}}>
          <Text style={styles.title}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={hidePass}
              value={password}
              onChangeText={setPassword}
              placeholder="Type your password"
              style={styles.inputWithIcon}
            />
            <TouchableOpacity
              onPress={() => setHidePass(!hidePass)}
              style={styles.iconStyle}>
              <Icon
                name={hidePass ? 'eye-slash' : 'eye'} // Toggle between 'eye' and 'eye-slash' icon
                size={20}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable
          style={styles.signInButton}
          onPress={() => navigation.navigate('TabNavigation')}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
            Sign In
          </Text>
        </Pressable>
      </View>
      <View style={{alignItems: 'center'}}>
        <Pressable
          onPress={() => {
            console.warn('forgot Password');
          }}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.orContinueWith}>- OR Continue with -</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginHorizontal: 60,
          marginVertical: 20,
          marginBottom: 24,
        }}>
        <Pressable
          onPress={() => {
            console.warn('google');
          }}
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
          onPress={() => {
            console.warn('facebook');
          }}
          style={styles.google}>
          <View style={styles.google1Parent}>
            <Image
              style={[styles.google1Icon]}
              resizeMode="cover"
              source={require('../assets/facebook1.png')}
            />
            <Text style={styles.google1}>Facebook</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.createAnAccount}>
        <Text style={[styles.createAnAccount1, styles.signUpTypo]}>
          Create An Account
        </Text>
        <Pressable
          onPress={() => {
            console.warn('SignUp');
          }}>
          <Text style={[styles.signUp, styles.signUpTypo]}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
  head: {
    padding: 16,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  input: {
    margin: 6,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 16,
    borderColor: 'rgba(2, 2, 2, 0.28)',
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
  },
  iconStyle: {
    position: 'absolute',
    right: 20,
    top: '30%',
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
  google1Icon: {
    width: 24,
    height: 24,
  },
  google1: {
    fontSize: 12,
    color: '#575757',
    textAlign: 'center',
    fontWeight: '500',
  },
  google1Parent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
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
  signUpTypo: {
    textAlign: 'center',
    fontSize: 14,
  },
  createAnAccount1: {
    fontFamily: 'Poppins-Regular',
    color: '#575757',
  },
  signUp: {
    fontWeight: 'bold',
    color: '#eb0029',
  },
  createAnAccount: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});
