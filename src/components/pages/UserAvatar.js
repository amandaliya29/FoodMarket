import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const UserAvatar = ({name = '?', size = 50, url = null}) => {
  // Function to generate initials
  const getInitials = () => {
    const nameSplit = name.trim().toUpperCase().split(' ');
    if (nameSplit.length === 1) {
      return nameSplit[0].charAt(0);
    } else {
      return nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
  };

  // Function to generate color based on initials
  const getColor = () => {
    const colours = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#34495e',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#2c3e50',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#878787',
      '#95a5a6',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d',
    ];
    const initials = getInitials();
    const charIndex = initials === '?' ? 72 : initials.charCodeAt(0) - 64;
    return colours[charIndex % colours.length];
  };

  const initials = getInitials();
  const backgroundColor = getColor();

  return (
    <View
      style={[
        styles.avatarContainer,
        {width: size, height: size, borderRadius: size / 2, backgroundColor},
      ]}>
      {url ? (
        <Image
          source={{uri: url}}
          style={[
            styles.avatar,
            {width: size, height: size, borderRadius: size / 2},
          ]}
        />
      ) : (
        <Text style={[styles.initials, {fontSize: size / 2}]}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    resizeMode: 'cover',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default UserAvatar;
