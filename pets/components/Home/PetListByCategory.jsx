import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import PetListItem from './PetListItem';

export default function PetListByCategory() {
  const [pets, setPets] = useState([]);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList();
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    try {
      setPets([]);
      const categoryPets = query(collection(db, 'Pets'), where('category', '==', category ? category : 'Birds'));
      const querySnapshot = await getDocs(categoryPets);
      querySnapshot.forEach((doc) => {
        setPets((prev) => [...prev, doc.data()]);
      });
      setLoader(false);
    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  };
  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={pets}
        renderItem={({ item }) => <PetListItem pet={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        refreshing={loader}
        onRefresh={() => GetPetList('Birds')}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
});
