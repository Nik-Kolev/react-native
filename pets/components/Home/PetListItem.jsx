import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

export default function PetListItem({ pet }) {
  return (
    <View style={{ padding: 10, backgroundColor: Colors.WHITE, marginRight: 15, borderRadius: 10, borderColor: 'black', borderWidth: 1 }}>
      <Image source={{ uri: pet?.imageUrl }} style={{ width: 150, height: 135, objectFit: 'cover', borderRadius: 10 }} />
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 22, textAlign: 'center', marginTop: 5 }}>{pet?.name}</Text>
      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>{pet?.breed}</Text>
        <Text
          style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.PRIMARY, backgroundColor: Colors.LIGHT_PRIMARY, paddingHorizontal: 7, borderRadius: 10 }}
        >
          {pet?.age} Yrs
        </Text>
      </View>
    </View>
  );
}
