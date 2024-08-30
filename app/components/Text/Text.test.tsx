import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from './index.tsx';

const testText = 'Test string';

describe('Text Component', () => {
  it('should render the text props', () => {
    render(<Text text={testText} />);
    expect(screen.getByText(testText)).toBeDefined();
  });

  it('should render the children', () => {
    render(<Text>{testText}</Text>);
    expect(screen.getByText(testText)).toBeDefined();
  });
});
