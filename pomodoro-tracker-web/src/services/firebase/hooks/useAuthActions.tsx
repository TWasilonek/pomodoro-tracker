import { useEffect } from 'react';
import { firebaseAuth, signInWithGoogle, signOut } from '../index';
import { useAppContext } from '../../../store/AppContext';
import { AUTH_ACTIONS } from '../../../store/Auth.reducers';

function useAuthActions() {
  const { dispatch, state } = useAppContext();

  useEffect(() => {
    if (state.user !== null) {
      dispatch({
        type: AUTH_ACTIONS.SIGN_IN_SUCCESS,
      });
    }
  }, [state.user, dispatch]);

  const logInWithFirebase = async () => {
    dispatch({ type: AUTH_ACTIONS.SIGN_IN_START });
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
    try {
      await signInWithGoogle();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error signing to google.', error);

      // The provider's credential:
      // const { credential } = error;
      // In case of auth/account-exists-with-different-credential error,
      // you can fetch the providers using this:

      if (error.code === 'auth/account-exists-with-different-credential') {
        // The provider's account email, can be used in case of
        // auth/account-exists-with-different-credential to fetch the providers
        firebaseAuth
          .fetchSignInMethodsForEmail(error.email)
          .then((providers: any) => {
            // The returned 'providers' is a list of the available providers
            // linked to the email address. Please refer to the guide for a more
            // complete explanation on how to recover from this error.
            // eslint-disable-next-line no-console
            console.log('providers: ', providers);
          });
      }

      dispatch({
        type: AUTH_ACTIONS.SIGN_IN_FAIL,
        payload: {
          error,
        },
      });
    }
  };

  const logoutWithFirebase = async () => {
    await signOut();
    dispatch({ type: AUTH_ACTIONS.SIGN_OUT });
  };

  return {
    logInWithFirebase,
    logoutWithFirebase,
  };
}

export default useAuthActions;
