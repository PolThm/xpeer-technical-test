import { render } from '@testing-library/react-native';
import React from 'react';

import Loader from '@/components/Loader';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('Loader', () => {
  it('renders ActivityIndicator with the correct color', () => {
    // Mock the return value of useThemeColor to simulate theme color
    (useThemeColor as jest.Mock).mockReturnValue('themeColor');

    // Render the Loader component
    const { getByTestId } = render(<Loader />);

    // Get the ActivityIndicator
    const activityIndicator = getByTestId('activity-indicator');

    // Assert that the color is applied correctly
    expect(activityIndicator.props.color).toBe('themeColor');
  });

  it('renders ThemedView with the correct styles', () => {
    // Mock the return value of useThemeColor to simulate theme color
    (useThemeColor as jest.Mock).mockReturnValue('themeColor');

    // Render the Loader component
    const { getByTestId } = render(<Loader />);

    // Get the ThemedView
    const themedView = getByTestId('themed-view');

    // Extract the styles from the ThemedView
    const styles = themedView.props.style;

    // Assert that the necessary styles are applied
    expect(styles).toEqual(expect.arrayContaining([expect.objectContaining({ padding: 20 })]));
  });
});
