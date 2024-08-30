import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { displayErrorMessage } from '../../components';
import { loginInWithGoogle } from './index';

// Mock dependencies
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
  isErrorWithCode: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
  signInWithCredential: jest.fn(),
}));

jest.mock('../../components', () => ({
  displayErrorMessage: jest.fn(),
}));

describe('Login with Google', () => {
  const mockHasPlayServices = GoogleSignin.hasPlayServices as jest.Mock;
  const mockSignIn = GoogleSignin.signIn as jest.Mock;
  const mockCredential = auth.GoogleAuthProvider.credential as jest.Mock;
  const mockIsErrorWithCode = isErrorWithCode as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully', async () => {
    mockHasPlayServices.mockResolvedValue(true);
    mockSignIn.mockResolvedValue({ idToken: 'fake-id-token' });
    mockCredential.mockReturnValue('fake-credential');

    await loginInWithGoogle();

    expect(mockHasPlayServices).toHaveBeenCalledWith({
      showPlayServicesUpdateDialog: true,
    });
    expect(mockSignIn).toHaveBeenCalled();
    expect(mockCredential).toHaveBeenCalledWith('fake-id-token');
  });

  it('should handle sign-in cancellation', async () => {
    mockHasPlayServices.mockResolvedValue(true);
    mockSignIn.mockRejectedValue({ code: statusCodes.SIGN_IN_CANCELLED });
    mockIsErrorWithCode.mockReturnValue(true);

    const result = await loginInWithGoogle();

    expect(mockIsErrorWithCode).toHaveBeenCalledWith({
      code: statusCodes.SIGN_IN_CANCELLED,
    });
    expect(displayErrorMessage).toHaveBeenCalledWith(
      'Google Error',
      'Sign in was cancelled',
    );
    expect(result).toBeNull();
  });

  it('should handle Play Services not available error', async () => {
    mockHasPlayServices.mockResolvedValue(true);
    mockSignIn.mockRejectedValue({
      code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
    });
    mockIsErrorWithCode.mockReturnValue(true);

    const result = await loginInWithGoogle();

    expect(mockIsErrorWithCode).toHaveBeenCalledWith({
      code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
    });
    expect(displayErrorMessage).toHaveBeenCalledWith(
      'Google Error',
      'Play service not available',
    );
    expect(result).toBeNull();
  });

  it('should handle missing ID token', async () => {
    await loginInWithGoogle();
    expect(mockCredential).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors', async () => {
    mockHasPlayServices.mockResolvedValue(true);
    mockSignIn.mockRejectedValue(new Error('Unexpected error'));

    const result = await loginInWithGoogle();

    expect(displayErrorMessage).toHaveBeenCalledWith(
      'Error',
      'An unexpected error occurred during sign in',
    );
    expect(result).toBeNull();
  });
});
