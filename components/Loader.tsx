import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const Loader = () => {
  const color = useThemeColor({}, 'text');

  return (
    <ThemedView style={styles.container} testID="themed-view">
      <ActivityIndicator size="large" color={color} testID="activity-indicator" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Loader;
