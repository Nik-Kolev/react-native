import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import PetListByCategory from '../../components/Home/PetListByCategory';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Slider />
      <PetListByCategory />
      <TouchableOpacity style={styles.addNewPetContainer}>
        <MaterialIcons name='pets' size={24} color='black' />
        <Text style={styles.addNewPetText}>Add new Pet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  addNewPetContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  addNewPetText: {
    fontFamily: 'outfit-medium',
    color: 'black',
    fontSize: 18,
  },
});
