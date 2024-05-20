import { useNavigation, useNavigationState } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Animated } from 'react-native';

import BackButton from '@/components/BackButton';
import { Paths } from '@/types';

// fix animation error
jest.mock('react-native', () => {
  const RealReactNative = jest.requireActual('react-native');
  RealReactNative.Animated.timing = (
    value: Animated.Value,
    config: Animated.TimingAnimationConfig
  ) => {
    return {
      start: (callback?: Animated.EndCallback) => {
        if (typeof config.toValue === 'number') {
          value.setValue(config.toValue);
        }
        callback && callback({ finished: true });
      },
    };
  };
  return RealReactNative;
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useNavigationState: jest.fn(),
}));

describe('BackButton', () => {
  const mockGoBack = jest.fn();
  const mockNavigate = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handles navigation correctly when can go back', () => {
    (useNavigation as jest.Mock).mockReturnValue({
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: mockGoBack,
      navigate: mockNavigate,
    });
    (useNavigationState as jest.Mock).mockReturnValue({
      routes: [{ name: 'character-details' }],
      index: 0,
    });

    const { getByTestId } = render(<BackButton />);

    fireEvent.press(getByTestId('back-button'));

    expect(mockGoBack).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('handles navigation correctly when cannot go back', () => {
    (useNavigation as jest.Mock).mockReturnValue({
      canGoBack: jest.fn().mockReturnValue(false),
      goBack: mockGoBack,
      navigate: mockNavigate,
    });
    (useNavigationState as jest.Mock).mockReturnValue({
      routes: [{ name: 'character-details' }],
      index: 0,
    });

    const { getByTestId } = render(<BackButton />);

    fireEvent.press(getByTestId('back-button'));

    expect(mockGoBack).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(Paths.CharactersList);
  });
});
