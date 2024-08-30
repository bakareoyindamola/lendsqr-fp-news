import React from 'react';
import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { Screen } from './index';

// Mocking the useSafeAreaInsetsStyle hook
jest.mock('../../utils/useSafeAreaInsetStyle.ts', () => ({
  useSafeAreaInsetsStyle: jest.fn().mockReturnValue({ paddingTop: 10 }),
}));

describe('Screen Component', () => {
  it('renders correctly with fixed preset', () => {
    render(
      <Screen preset="fixed">
        <Text>Fixed Screen Content</Text>
      </Screen>,
    );

    expect(screen.getByText('Fixed Screen Content')).toBeTruthy();
  });

  it('renders correctly with scroll preset', () => {
    render(
      <Screen preset="scroll">
        <Text>Scrollable Screen Content</Text>
      </Screen>,
    );

    expect(screen.getByText('Scrollable Screen Content')).toBeTruthy();
  });

  it('renders correctly with auto preset and enables/disables scrolling based on content size', () => {
    render(
      <Screen preset="auto">
        <View>
          <Text>Auto Screen Content</Text>
        </View>
      </Screen>,
    );

    const scrollView = screen.getByTestId('scroll-view');
    expect(screen.getByText('Auto Screen Content')).toBeTruthy();
    expect(scrollView.props.scrollEnabled).toBe(true);
  });

  it('applies safe area insets correctly', () => {
    render(
      <Screen preset="fixed" safeAreaEdges={['top']}>
        <Text>Screen with Safe Area Insets</Text>
      </Screen>,
    );

    const container = screen.getByTestId('screen-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ paddingTop: 10 }]),
    );
  });
});
