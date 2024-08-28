import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors';

export default function TabLayout() {
  const createScreenOptions = (title, iconName) => {
    return {
      title,
      headerShown: false,
      fontsize: 44,
      tabBarIcon: ({ color }) => <Ionicons name={iconName} size={24} color={color} />,
    };
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.TABTINT,
        tabBarInactiveTintColor: Colors.TABINACTIVE,
        tabBarStyle: {
          padding: 7,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          paddingBottom: 2,
        },
      }}
    >
      <Tabs.Screen name='home' options={createScreenOptions('Home', 'home')} />
      <Tabs.Screen name='favorite' options={createScreenOptions('Favorites', 'heart')} />
      <Tabs.Screen name='inbox' options={createScreenOptions('Inbox', 'chatbubble')} />
      <Tabs.Screen name='profile' options={createScreenOptions('Profile', 'people-circle')} />
    </Tabs>
  );
}
