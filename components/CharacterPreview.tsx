import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FC } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Character, Paths, RootStackParamList } from '@/types';
import transformFalsyString from '@/utils/transformFalsyString';

type Props = {
  item: Character;
};

const CharacterPreview: FC<Props> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const borderColor = useThemeColor({}, 'border');

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(Paths.CharacterDetails, {
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
            {transformFalsyString(item.name)}
          </ThemedText>
          <ThemedText>Status: {transformFalsyString(item.status)}</ThemedText>
          <ThemedText>Origin: {transformFalsyString(item.origin.name)}</ThemedText>
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
