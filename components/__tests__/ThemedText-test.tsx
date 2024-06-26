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
    (useThemeColor as jest.Mock).mockReturnValue('lightBackgroundColor');
    const { getByTestId } = render(
      <ThemedView lightColor="lightColor" darkColor="darkColor" testID="themed-view" />
    );
    const view = getByTestId('themed-view');

    expect(view.props.style).toEqual([{ backgroundColor: 'lightBackgroundColor' }, undefined]);
  });

  it('applies dark color in dark theme', () => {
    (useThemeColor as jest.Mock).mockReturnValue('darkBackgroundColor');
    const { getByTestId } = render(
      <ThemedView lightColor="lightColor" darkColor="darkColor" testID="themed-view" />
    );
    const view = getByTestId('themed-view');

    expect(view.props.style).toEqual([{ backgroundColor: 'darkBackgroundColor' }, undefined]);
  });

  it('applies default background color when no light or dark color is provided', () => {
    (useThemeColor as jest.Mock).mockReturnValue('defaultBackgroundColor');
    const { getByTestId } = render(<ThemedView testID="themed-view" />);
    const view = getByTestId('themed-view');

    expect(view.props.style).toEqual([{ backgroundColor: 'defaultBackgroundColor' }, undefined]);
  });

  it('applies additional styles correctly', () => {
    (useThemeColor as jest.Mock).mockReturnValue('defaultBackgroundColor');
    const additionalStyle = { padding: 10 };
    const { getByTestId } = render(<ThemedView style={additionalStyle} testID="themed-view" />);
    const view = getByTestId('themed-view');

    expect(view.props.style).toEqual([
      { backgroundColor: 'defaultBackgroundColor' },
      additionalStyle,
    ]);
  });
});
