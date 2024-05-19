import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FC } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Character, RootStackParamList } from '@/types';

type Props = {
  item: Character;
  status: string;
  origin: string;
};

const CharacterPreview: FC<Props> = ({ item, status, origin }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const borderColor = useThemeColor({}, 'border');

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('character-details', {
          id: item.id,
          image: item.image,
          name: item.name,
          status: item.status,
          origin: item.origin,
          gender: item.gender,
          location: item.location,
        })
      }>
      <ThemedView style={[styles.item, { borderBottomColor: borderColor }]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <ThemedView style={styles.info}>
          <ThemedText style={styles.name} type="defaultSemiBold">
            {item.name}
          </ThemedText>
          <ThemedText>Status: {status}</ThemedText>
          <ThemedText>Origin: {origin}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 3,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
  },
});

export default CharacterPreview;
