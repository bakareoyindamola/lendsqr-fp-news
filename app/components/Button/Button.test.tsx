import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from './index';

describe('Button Component', () => {
  const mockPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('renders with text', () => {
    render(<Button text="Click Me" onPress={mockPress} />);

    const button = screen.getByText('Click Me');
    expect(button).toBeTruthy();
  });

  it('renders with children', () => {
    render(<Button onPress={mockPress}>Children</Button>);
    expect(screen.getByText('Children')).toBeTruthy();
  });

  it('handles onPress event correctly', () => {
    render(<Button text="Click Me" onPress={mockPress} />);

    fireEvent.press(screen.getByText('Click Me'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('renders with left and right accessories', () => {
    const LeftAccessory = () => <Text>Left</Text>;
    const RightAccessory = () => <Text>Right</Text>;

    render(
      <Button
        text="Click Me"
        onPress={mockPress}
        LeftAccessory={LeftAccessory}
        RightAccessory={RightAccessory}
      />,
    );

    expect(screen.getByText('Left')).toBeTruthy();
    expect(screen.getByText('Right')).toBeTruthy();
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button text="Click Me" disabled onPress={mockPress} />);

    expect(screen.getByRole('button').props.accessibilityState.disabled).toBe(
      true,
    );
    fireEvent.press(screen.getByText('Click Me'));

    expect(mockPress).toHaveBeenCalledTimes(0);
  });
});
