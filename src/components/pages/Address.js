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
import Icon from 'react-native-vector-icons/Ionicons';
import DropDown from './DropDown';
import {useNavigation, useRoute} from '@react-navigation/native';

const Address = () => {
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [house, setHouse] = useState();
  const [city, setCity] = useState();
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const hideAccountSection = route.params?.hideAccountSection || false;
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
            <View style={{marginBottom: 16}}>
              <Text style={styles.title}>Phone No</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="number-pad"
                placeholder="Type your phone number"
                placeholderTextColor={'grey'}
                style={styles.input}
              />
            </View>
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
          <View>
            <Pressable
              style={styles.signInButton}
              onPress={() => {
                {
                  !hideAccountSection
                    ? navigation.navigate('SignIn')
                    : navigation.goBack();
                }
              }}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
                {!hideAccountSection ? 'Continue' : 'Update'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Address;

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
});
