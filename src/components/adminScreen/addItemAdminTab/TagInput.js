import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';

const TagInput = ({
  maxTags = 10,
  duplicate = false,
  initialTags = [],
  onChange,
}) => {
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const showToastWithGravityAndOffset = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const handleAddTag = () => {
    if (inputValue.trim() === '' || tags.length >= maxTags) return;

    if (editIndex !== null) {
      const updatedTags = [...tags];
      updatedTags[editIndex] = inputValue.trim();
      setTags(updatedTags);
      onChange(updatedTags);
      setEditIndex(null);
    } else if (!duplicate && tags.includes(inputValue)) {
      showToastWithGravityAndOffset(`Duplicate tag: ${inputValue}`);
      return;
    } else {
      const updatedTags = [...tags, inputValue.trim()];
      setTags(updatedTags);
      onChange(updatedTags);
    }
    setInputValue('');
  };

  const handleDeleteTag = tagToDelete => {
    const updatedTags = tags.filter(tag => tag !== tagToDelete);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  const handleEditTag = index => {
    setInputValue(tags[index]);
    setEditIndex(index);
  };

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tagList}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <TouchableOpacity onPress={() => handleEditTag(index)}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTag(tag)}>
              <Text style={styles.deleteTag}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handleAddTag}
        placeholder="Add a tag"
      />
      <TouchableOpacity onPress={handleAddTag} style={styles.addButton}>
        <Text style={styles.addButtonText}>
          {editIndex !== null ? 'Update Tag' : 'Add Tag'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    marginHorizontal: 16,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#eb0029',
    color: 'white',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 15,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: 'white',
  },
  deleteTag: {
    marginLeft: 7,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#eb0029',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
  },
});

export default TagInput;
