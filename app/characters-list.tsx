import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FlatList } from 'react-native';

import { fetchCharacters } from '@/api';
import CharacterPreview from '@/components/CharacterPreview';
import ErrorModal from '@/components/ErrorModal';
import Loader from '@/components/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import SearchBar from '@/components/SearchBar';
import { ThemedView } from '@/components/ThemedView';
import { CharactersResponse, Character } from '@/types';
import transformFalsyString from '@/utils/transformFalsyString';

export default function CharactersList() {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const debouncedSetSearchText = useCallback(
    debounce((text) => setDebouncedSearchText(text), 300),
    []
  );

  const handleSearchText = (text: string, immediate = false) => {
    setSearchText(text);
    if (immediate) {
      setDebouncedSearchText(text); // to reset input immediately with the clear button
    } else {
      debouncedSetSearchText(text);
    }
  };

  const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery<CharactersResponse, Error>({
      queryKey: ['characters', debouncedSearchText],
      queryFn: ({ pageParam = 1 }: { pageParam: any }) =>
        fetchCharacters({ pageParam, name: debouncedSearchText }),
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

  useEffect(() => {
    if (isError) setIsErrorModalVisible(true);
  }, [isError]);

  useEffect(() => {
    refetch();
  }, [debouncedSearchText, refetch]);

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const renderItem = useCallback(({ item }: { item: Character }) => {
    const status = transformFalsyString(item.status);
    const origin = transformFalsyString(item.origin.name);

    return <CharacterPreview item={item} status={status} origin={origin} />;
  }, []);

  const characters = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data]);
  const noResultsFound = useMemo(
    () => debouncedSearchText && !characters.length,
    [debouncedSearchText, characters.length]
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <SearchBar searchText={searchText} setSearchText={handleSearchText} />
      {isLoading && !isFetchingNextPage ? (
        <Loader />
      ) : (
        <>
          {noResultsFound && <NoResultsFound />}
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
          />
        </>
      )}
      <ErrorModal visible={isErrorModalVisible} onClose={() => setIsErrorModalVisible(false)} />
    </ThemedView>
  );
}
