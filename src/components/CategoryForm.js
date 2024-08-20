import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const CategoryForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name);
    setName('');
  };

  return (
    <View>
      <TextInput placeholder="Category Name" value={name} onChangeText={setName} />
      <Button title="Add Category" onPress={handleSubmit} />
    </View>
  );
};

export default CategoryForm;
