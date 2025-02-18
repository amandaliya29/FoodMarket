import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import DropDown from './DropDown';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditAddress = () => {
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [house, setHouse] = useState();
  const [city, setCity] = useState();
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const {cartItems} = route.params.cartItems;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.text}>Address</Text>
          <Text style={styles.letsGetSome}>Make sure it's valid</Text>
        </View>
      </View>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[
            styles.formBox,
            {
              width: width >= 400 ? 500 : width - 20,
            },
          ]}>
          <View>
            <Text style={styles.title}>House No</Text>
            <TextInput
              value={house}
              onChangeText={setHouse}
              placeholder="Type your house number"
              keyboardType="name-number-pad"
              placeholderTextColor={'grey'}
              style={styles.input}
            />
          </View>
          <View style={{marginTop: 16}}>
            <Text style={styles.title}>Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Type your address"
              placeholderTextColor={'grey'}
              style={styles.input}
            />
          </View>
          <View>
            <DropDown value={city} setValue={setCity} />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            {backgroundColor: 'transparent', paddingHorizontal: 20},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.navButtonText, {color: 'red'}]}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() =>
            navigation.navigate('BillPage', route.params.cartItems)
          }>
          <Text style={[styles.navButtonText]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  formBox: {
    marginHorizontal: 10,
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingBottom: 200,
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
    marginRight: 16,
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
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 80,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    gap: 10,
  },

  navButton: {
    borderRadius: 8,
    backgroundColor: '#eb0029',
    height: 38,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});
