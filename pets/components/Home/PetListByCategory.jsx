import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import PetListItem from './PetListItem';
import { debounce } from '../../utils/debounce';

export default function PetListByCategory() {
  const [pets, setPets] = useState([]);

  const [loader, setLoader] = useState(false);
  const isRequestInProgress = useRef(false);

  useEffect(() => {
    GetPetList();
  }, []);

  const GetPetList = useCallback(
    debounce(async (category) => {
      if (isRequestInProgress.current) return;
      isRequestInProgress.current = true;

      setLoader(true);
      try {
        setPets([]);
        const categoryPets = query(collection(db, 'Pets'), where('category', '==', category || 'Birds'));
        const querySnapshot = await getDocs(categoryPets);
        const petsData = [];
        querySnapshot.forEach((doc) => {
          petsData.push({ ...doc.data(), id: doc.id });
        });
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoader(false);
        isRequestInProgress.current = false;
      }
    }, 300),
    []
  );

  return (
    <View style={styles.wrapper}>
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
  wrapper: {
    flex: 1,
  },
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
