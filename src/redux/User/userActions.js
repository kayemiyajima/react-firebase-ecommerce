import { 
    RESET_AUTH_FORMS, 
    RESET_PASSWORD_ERROR, 
    RESET_PASSWORD_SUCCESS, 
    SET_CURRENT_USER, 
    SIGN_IN_ERROR, 
    SIGN_IN_SUCCESS, 
    SIGN_UP_ERROR, 
    SIGN_UP_SUCCESS } from './userTypes';
import { auth, handleUserProfile, googleProvider } from './../../firebase/utils';

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const signInUser = ({ email, password }) => async (dispatch) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: true
        });
    } catch (err) {
        const errMessage = 'Failed to login, check your email and password.'
        dispatch({
            type: SIGN_IN_ERROR,
            payload: errMessage
        });
    }
};

export const signUpUser = ({ displayName, email, password, passwordConfirm }) => async (dispatch) => {
    if (password !== passwordConfirm) {
        const errMessage = 'Passwords do not match';
        dispatch({
            type: SIGN_UP_ERROR,
            payload: errMessage
        });
        return;
    }

    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await handleUserProfile(user, { displayName });
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: true
        });
    } catch (err) {
        const errMessage = 'Failed to create an account';
        dispatch({
            type: SIGN_UP_ERROR,
            payload: errMessage
        });
    }
};

export const resetPassword = ({ email }) => async (dispatch) => {
    try {
        await auth.sendPasswordResetEmail(email)
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: true
        });
    } catch(err) {
        console.log(err);
        const errMessage = 'Email address does not exist. Please try it again.';
        dispatch({
            type: RESET_PASSWORD_ERROR,
            payload: errMessage
        });
    }
};

export const signInWithGoogle = () => async (dispatch) => {
    try {
        await auth.signInWithPopup(googleProvider)
        .then(() => {
            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: true
            })
        });
    } catch (err) {
        console.log(err)
    }
};

export const resetAllAuthForms = () => ({
    type: RESET_AUTH_FORMS,
});