import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({value, setValue}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Bangalore', value: 'Bangalore'},
    {label: 'Hyderabad', value: 'Hyderabad'},
    {label: 'Chennai', value: 'Chennai'},
    {label: 'Kolkata', value: 'Kolkata'},
    {label: 'Pune', value: 'Pune'},
    {label: 'Jaipur', value: 'Jaipur'},
  ]);

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
