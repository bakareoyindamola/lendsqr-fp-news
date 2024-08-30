import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { iconRegistry } from './iconRegistry';
import { Icon } from './index';

describe('Icon Component', () => {
  const iconName = Object.keys(iconRegistry)[0] as keyof typeof iconRegistry;
  const mockPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the icon correctly', () => {
    render(<Icon icon={iconName} />);

    const image = screen.getByTestId('icon-image');
    expect(image).toBeTruthy();
    expect(image.props.source).toContain(iconRegistry[iconName]);
  });

  it('renders within a TouchableOpacity if onPress is provided', () => {
    render(<Icon icon={iconName} onPress={mockPress} />);

    const button = screen.getByRole('imagebutton');
    expect(button).toBeTruthy();
  });

  it('renders within a View if onPress is not provided', () => {
    render(<Icon icon={iconName} />);

    const image = screen.getByTestId('icon-image');
    expect(image).toBeTruthy();
    expect(() => screen.getByRole('imagebutton')).toThrow();
  });

  it('calls onPress when the icon is pressed', () => {
    render(<Icon icon={iconName} onPress={mockPress} />);

    const button = screen.getByRole('imagebutton');
    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
