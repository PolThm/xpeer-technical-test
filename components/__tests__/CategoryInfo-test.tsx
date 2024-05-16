import { render } from '@testing-library/react-native';
import React from 'react';

import CategoryInfo from '@/components/CategoryInfo';

describe('CategoryInfo', () => {
  it('renders correctly with valid props', () => {
    const { getByText } = render(<CategoryInfo label="Test Label" value="Test Value" />);

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByText('Test Value')).toBeTruthy();
  });

  it('transforms falsy value prop to default string', () => {
    const { getByText } = render(<CategoryInfo label="Test Label" value={null} />);

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByText('N/A')).toBeTruthy();
  });
});
