import { FC } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  searchText: string;
  setSearchText: (text: string, immediate?: boolean) => void;
};

const SearchBar: FC<Props> = ({ searchText, setSearchText }) => {
  const placeholderColor = useThemeColor({}, 'placeholder');
  const borderColor = useThemeColor({}, 'border');
  const color = useThemeColor({}, 'text');

  return (
    <View style={[styles.searchContainer, { borderColor }]}>
      <TextInput
        style={[styles.searchBar, { color }]}
        placeholder="Search..."
        placeholderTextColor={placeholderColor}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Pressable
        onPress={() => setSearchText('', true)}
        style={{
          opacity: searchText.length > 0 ? 1 : 0,
          paddingVertical: 5,
        }}>
        <ThemedText style={styles.clearButton}>✕</ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchBar;
