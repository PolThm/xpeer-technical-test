import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

const NoResultsFound = () => {
  return <ThemedText style={styles.container}>No results found...</ThemedText>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default NoResultsFound;
