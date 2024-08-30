import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../../components';
import { reportCrash } from '../../utils/crashReporting.ts';

interface Props {
  children: ReactNode;
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { error: null, errorInfo: null };

  // If an error in a child is encountered, this will run
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only set errors if enabled
    if (!this.isEnabled()) {
      return;
    }
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });

    // log error messages to crashlytics
    reportCrash(error);
  }

  // Reset the error back to null
  resetError = () => {
    this.setState({ error: null, errorInfo: null });
  };

  // To avoid unnecessary re-renders
  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<State>,
  ): boolean {
    return nextState.error !== this.state.error;
  }

  // Only enable if we're catching errors in the right environment
  isEnabled(): boolean {
    return (
      this.props.catchErrors === 'always' ||
      (this.props.catchErrors === 'dev' && __DEV__) ||
      (this.props.catchErrors === 'prod' && !__DEV__)
    );
  }

  // Render an error UI if there's an error; otherwise, render children
  render() {
    return this.isEnabled() && this.state.error ? (
      <View>
        <Text>Error</Text>
      </View>
    ) : (
      this.props.children
    );
  }
}
