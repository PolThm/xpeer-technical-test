import { render } from '@testing-library/react-native';
import React from 'react';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedView', () => {
  it('applies light color in light theme', () => {
    // Mock the return value of useThemeColor to simulate light theme
    (useThemeColor as jest.Mock).mockReturnValue('lightBackgroundColor');

    // Render ThemedView component
    const { getByTestId } = render(
      <ThemedView lightColor="lightColor" darkColor="darkColor" testID="themed-view" />
    );

    // Get the rendered view
    const view = getByTestId('themed-view');

    // Assert that the background color is applied correctly for light theme
    expect(view.props.style).toEqual([{ backgroundColor: 'lightBackgroundColor' }, undefined]);
  });

  it('applies dark color in dark theme', () => {
    // Mock the return value of useThemeColor to simulate dark theme
    (useThemeColor as jest.Mock).mockReturnValue('darkBackgroundColor');

    // Render ThemedView component
    const { getByTestId } = render(
      <ThemedView lightColor="lightColor" darkColor="darkColor" testID="themed-view" />
    );

    // Get the rendered view
    const view = getByTestId('themed-view');

    // Assert that the background color is applied correctly for dark theme
    expect(view.props.style).toEqual([{ backgroundColor: 'darkBackgroundColor' }, undefined]);
  });

  it('applies default background color when no light or dark color is provided', () => {
    // Mock the return value of useThemeColor to simulate default background color
    (useThemeColor as jest.Mock).mockReturnValue('defaultBackgroundColor');

    // Render ThemedView component
    const { getByTestId } = render(<ThemedView testID="themed-view" />);

    // Get the rendered view
    const view = getByTestId('themed-view');

    // Assert that the default background color is applied
    expect(view.props.style).toEqual([{ backgroundColor: 'defaultBackgroundColor' }, undefined]);
  });

  it('applies additional styles correctly', () => {
    // Mock the return value of useThemeColor to simulate default background color
    (useThemeColor as jest.Mock).mockReturnValue('defaultBackgroundColor');

    // Define additional styles
    const additionalStyle = { padding: 10 };

    // Render ThemedView component with additional styles
    const { getByTestId } = render(<ThemedView style={additionalStyle} testID="themed-view" />);

    // Get the rendered view
    const view = getByTestId('themed-view');

    // Assert that the additional styles are applied correctly
    expect(view.props.style).toEqual([
      { backgroundColor: 'defaultBackgroundColor' },
      additionalStyle,
    ]);
  });
});
