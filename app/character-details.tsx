import { useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image, ScrollView, View } from 'react-native';

import { BackButton } from '@/components/BackButton';
import CategoryInfo from '@/components/CategoryInfo';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootStackParamList } from '@/types';

export default function CharacterDetails() {
  const route = useRoute<RouteProp<RootStackParamList, 'character-details'>>();

  const { image, name, status, origin, gender, location } = route.params;

  return (
    <ThemedView style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <BackButton />
          <Image source={{ uri: image }} style={styles.image} />
          <ThemedText style={styles.name}>{name}</ThemedText>
          <View style={styles.infoWrapper}>
            <CategoryInfo label="Status" value={status} />
            <CategoryInfo label="Gender" value={gender} />
            <CategoryInfo label="Origin" value={origin.name} />
            <CategoryInfo label="Last Known Location" value={location.name} />
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
  },
  infoWrapper: {
    width: '100%',
  },
});
