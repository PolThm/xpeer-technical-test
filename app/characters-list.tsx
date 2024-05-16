import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, Image, Pressable } from 'react-native';

import { fetchCharacters } from '@/api';
import Loader from '@/components/Loader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CharactersResponse, Character, RootStackParamList } from '@/types';
import transformFalsyString from '@/utils/transformFalsyString';

const CharactersList = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<CharactersResponse, Error>({
      queryKey: ['characters'],
      queryFn: ({ pageParam = 1 }: { pageParam: any }) => fetchCharacters({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.info.next) {
          const url = new URL(lastPage.info.next);
          const params = new URLSearchParams(url.search);
          return params.get('page') ? parseInt(params.get('page') as any) : undefined;
        }
        return undefined;
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ThemedText>Error fetching data</ThemedText>;
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: Character }) => {
    const status = transformFalsyString(item.status);
    const origin = transformFalsyString(item.origin.name);

    return <CharacterItem item={item} status={status} origin={origin} navigation={navigation} />;
  };

  const characters = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
    />
  );
};

const CharacterItem = ({
  item,
  status,
  origin,
  navigation,
}: {
  item: Character;
  status: string;
  origin: string;
  navigation: NavigationProp<RootStackParamList>;
}) => (
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
    <ThemedView style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <ThemedView style={styles.info}>
        <ThemedText style={styles.name}>{item.name}</ThemedText>
        <ThemedText>Status: {status}</ThemedText>
        <ThemedText>Origin: {origin}</ThemedText>
      </ThemedView>
    </ThemedView>
  </Pressable>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
});

export default CharactersList;
