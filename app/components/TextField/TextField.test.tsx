import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { TextField, TextFieldProps } from './index.tsx';

describe('TextField Component', () => {
  const defaultProps: TextFieldProps = {
    label: 'Test Label',
    placeholder: 'Test Placeholder',
    helper: 'Test Helper',
    onChangeText: jest.fn(),
    value: '',
  };

  it('renders label correctly', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('renders placeholder correctly', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeTruthy();
  });

  it('renders helper text correctly', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByText('Test Helper')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    render(<TextField {...defaultProps} />);
    const input = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.changeText(input, 'New Text');
    expect(defaultProps.onChangeText).toHaveBeenCalledWith('New Text');
  });

  it('does not allow input when disabled', () => {
    render(<TextField {...defaultProps} editable={false} />);
    const input = screen.getByPlaceholderText('Test Placeholder');
    expect(input.props.editable).toBe(false);
  });
});
