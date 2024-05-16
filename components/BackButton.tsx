import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { RootStackParamList } from '@/types';

export function BackButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const color = useThemeColor({}, 'text');

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('index');
    }
  };

  return (
    <Pressable
      style={[styles.button, { borderColor: color }]}
      onPress={goBack}
      testID="back-button">
      <Ionicons name="arrow-back" size={24} color={color} testID="back-button-icon" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
