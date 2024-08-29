import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import getInfoFromFireStore from '../../utils/getInfoFromFireStore';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfoFromFireStore('Sliders');
        setSliderList(data);
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    };

    fetchData();
  }, []);

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
