import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { displayErrorMessage } from '../../components';

GoogleSignin.configure({
  webClientId:
    '35561497865-2pd6lde0k7hg9rqsajopcg5ce5sjsa92.apps.googleusercontent.com',
  offlineAccess: true,
});

export const loginInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const userInfo = await GoogleSignin.signIn();

    if (!userInfo.idToken) {
      throw new Error('No ID token returned');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    return await auth().signInWithCredential(googleCredential);
  } catch (error: any) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          displayErrorMessage('Google Sign-In failed', 'Sign in was cancelled');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          displayErrorMessage('Google Sign-In failed', 'Developer Error');
          break;
        default:
        // something else happened
      }
    } else {
      // an error that's not related to google sign in occurred
      displayErrorMessage(
        'Google Sign-In failed',
        typeof error?.message === 'string'
          ? error.message
          : 'An unexpected error occurred during sign in',
      );
    }

    return null;
  }
};
