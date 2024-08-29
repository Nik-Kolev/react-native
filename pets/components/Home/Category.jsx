import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import getInfoFromFireStore from '../../utils/getInfoFromFireStore';
import Colors from '../../constants/Colors';

export default function Category({ category }) {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('Birds');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfoFromFireStore('Category');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Category</Text>
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setSelectedCategory(item?.name);
              category(item.name);
            }}
          >
            <View style={[styles.container, selectedCategory === item.name && styles.selectedCategoryContainer]}>
              <Image source={{ uri: item?.imageUrl }} style={{ width: 80, height: 80 }} resizeMode='cover' />
            </View>
            <Text style={{ textAlign: 'center', fontFamily: 'outfit', fontSize: 16 }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    padding: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    borderColor: Colors.SECONDARY,
  },
});
