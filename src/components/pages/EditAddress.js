import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDown from './DropDown';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAddress = () => {
  const [userDetails, setUserDetail] = useState();
  const [address, setAddress] = useState('');
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('');

  const [errors, setErrors] = useState({});

  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.cartItems;

  const validateForm = () => {
    const newErrors = {};
    if (!house) newErrors.house = 'House number is required';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate('BillPage', {
        item: item,
        house: house,
        address: address,
        city: city,
      });
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');

      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        setUserDetail(parsedDetails);
        setAddress(parsedDetails.user.address);
        setHouse(parsedDetails.user.house_no);
        setCity(parsedDetails.user.city);
      }
    } catch (error) {
      console.warn('Failed to load user details', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* {console.warn(item)} */}
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
              keyboardType="default"
              placeholderTextColor={'grey'}
              style={styles.input}
            />
            {errors.house && (
              <Text style={styles.errorText}>{errors.house}</Text>
            )}
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
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
          </View>
          <View>
            <DropDown value={city} setValue={setCity} />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
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

        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navButtonText}>Next</Text>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 16,
    marginTop: 2,
  },
});
