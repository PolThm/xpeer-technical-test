import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { BackButton } from '@/components/BackButton';

// Mock the useNavigation hook
const mockNavigation = {
  canGoBack: jest.fn(),
  goBack: jest.fn(),
  navigate: jest.fn(),
};
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

describe('BackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls navigation.goBack if navigation can go back', () => {
    // Mock canGoBack to return true
    mockNavigation.canGoBack.mockReturnValue(true);

    // Render the BackButton component
    const { getByTestId } = render(<BackButton />);

    // Get the button and fire press event
    const button = getByTestId('back-button');
    fireEvent.press(button);

    // Assert that navigation.goBack was called
    expect(mockNavigation.goBack).toHaveBeenCalled();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('calls navigation.navigate to "index" if navigation cannot go back', () => {
    // Mock canGoBack to return false
    mockNavigation.canGoBack.mockReturnValue(false);

    // Render the BackButton component
    const { getByTestId } = render(<BackButton />);

    // Get the button and fire press event
    const button = getByTestId('back-button');
    fireEvent.press(button);

    // Assert that navigation.navigate was called with "index"
    expect(mockNavigation.navigate).toHaveBeenCalledWith('index');
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });
});
