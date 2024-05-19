import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { RootStackParamList } from '@/types';

export function BackButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const color = useThemeColor({}, 'text');
  const currentRoute = useNavigationState((state) => state.routes[state.index]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentRoute?.name === 'character-details') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [currentRoute, fadeAnim]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('index');
    }
  };

  return (
    <Animated.View style={[styles.button, { borderColor: color, opacity: fadeAnim }]}>
      <Pressable onPress={goBack} testID="back-button">
        <Ionicons name="arrow-back" size={24} color={color} testID="back-button-icon" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: -60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
