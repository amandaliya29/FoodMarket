import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({value, setValue}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Agra', value: 'Agra'},
    {label: 'Ahmedabad', value: 'Ahmedabad'},
    {label: 'Bangalore', value: 'Bangalore'},
    {label: 'Bhopal', value: 'Bhopal'},
    {label: 'Chennai', value: 'Chennai'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Hyderabad', value: 'Hyderabad'},
    {label: 'Jaipur', value: 'Jaipur'},
    {label: 'Kolkata', value: 'Kolkata'},
    {label: 'Lucknow', value: 'Lucknow'},
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Pune', value: 'Pune'},
    {label: 'Ranchi', value: 'Ranchi'},
    {label: 'Surat', value: 'Surat'},
    {label: 'Thiruvananthapuram', value: 'Thiruvananthapuram'},
    {label: 'Vadodara', value: 'Vadodara'},
    {label: 'Varanasi', value: 'Varanasi'},
    {label: 'Visakhapatnam', value: 'Visakhapatnam'},
  ]);

  useEffect(() => {
    items;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>City</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select your city"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholder}
        labelStyle={styles.labelStyle}
        arrowIconStyle={styles.arrowIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  placeholder: {
    color: '#999',
  },
  labelStyle: {
    fontSize: 16,
  },
  arrowIcon: {
    tintColor: '#999',
  },
});

export default DropDown;
