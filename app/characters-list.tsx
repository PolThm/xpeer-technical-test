import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Image, Pressable, TextInput, View } from 'react-native';

import { fetchCharacters } from '@/api';
import Loader from '@/components/Loader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CharactersResponse, Character, RootStackParamList } from '@/types';
import transformFalsyString from '@/utils/transformFalsyString';

const CharactersList = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const placeholderColor = useThemeColor({}, 'placeholder');
  const borderColor = useThemeColor({}, 'border');
  const color = useThemeColor({}, 'text');

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

  if (!error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={{ padding: 10 }}>
          Error fetching data. Please look at your network connection.
        </ThemedText>
      </ThemedView>
    );
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
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchContainer, { borderColor }]}>
        <TextInput
          style={[styles.searchBar, { color }]}
          placeholder="Search..."
          placeholderTextColor={placeholderColor}
          value={searchText}
          onChangeText={setSearchText}
        />
        <Pressable
          onPress={() => setSearchText('')}
          style={{ opacity: searchText.length > 0 ? 1 : 0 }}>
          <ThemedText style={styles.clearButton}>✕</ThemedText>
        </Pressable>
      </View>
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
      />
    </ThemedView>
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
        <ThemedText style={styles.name} type="defaultSemiBold">
          {item.name}
        </ThemedText>
        <ThemedText>Status: {status}</ThemedText>
        <ThemedText>Origin: {origin}</ThemedText>
      </ThemedView>
    </ThemedView>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
  },
  clearButton: {
    paddingHorizontal: 10,
  },
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
    fontWeight: '600',
  },
});

export default CharactersList;
