import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hidePass, setHidePass] = useState(true);

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
          <Text style={styles.text}>Sign Up</Text>
          <Text style={styles.letsGetSome}>Register and eat</Text>
        </View>
      </View>
      <View style={{alignItems: 'center', marginBottom: 16}}>
        <View style={styles.imageBorder}>
          <View style={styles.imgContainer}>
            <View style={styles.picIcon}>
              <Text style={{fontWeight: '400'}}>Add</Text>
              <Text style={{fontWeight: '400'}}>Photo</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={{marginBottom: 16}}>
          <Text style={styles.title}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Type your full name"
            style={styles.input}
          />
        </View>
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
              <Icon2
                name={hidePass ? 'eye-slash' : 'eye'}
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
            Sign Up
          </Text>
        </Pressable>
      </View>
      <View style={styles.createAnAccount}>
        <Text style={[styles.createAnAccount1, styles.signUpTypo]}>
          I Already Have an Account
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text style={[styles.signUp, styles.signUpTypo]}>Log in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    marginRight: 26,
  },
  picIcon: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: 90,
    borderRadius: 45,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBorder: {
    width: 110,
    height: 110,
    borderWidth: 1.5,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: '#8D92A3',
  },
  imgContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
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
