import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    try {
      const snapshot = await getDocs(collection(db, 'Sliders'));
      snapshot.forEach((doc) => {
        setSliderList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.error('Error fetching sliders:', error);
    }
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item?.imageUrl }} style={styles.sliderImage} resizeMode='cover' />
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get('screen').width * 0.9,
    borderRadius: 15,
    marginRight: 20,
    height: 190,
  },
});
