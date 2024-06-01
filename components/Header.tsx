import React from 'react';
import { StyleSheet, View } from 'react-native';

import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

const Header = () => {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.header, { borderBottomColor: borderColor }]}>
      <BackButton />
      <ThemedText style={styles.title}>Rick and Morty characters</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    zIndex: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    padding: 20,
    textAlign: 'center',
    fontFamily: 'GetSchwifty',
  },
});

export default Header;
