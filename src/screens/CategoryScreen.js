import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { BudgetContext } from '../context/BudgetContext';
import CategoryForm from '../components/CategoryForm';

const CategoryScreen = () => {
  const { categories, addCategory } = useContext(BudgetContext);

  return (
    <View>
      <CategoryForm onSubmit={addCategory} />
      <Text>Categories:</Text>
      {categories.map((category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </View>
  );
};

export default CategoryScreen;
