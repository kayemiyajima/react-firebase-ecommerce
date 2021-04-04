import { 
    SET_CURRENT_USER, 
    SIGN_IN_ERROR, 
    SIGN_IN_SUCCESS, 
    SIGN_UP_ERROR, 
    SIGN_UP_SUCCESS, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_ERROR,
    RESET_AUTH_FORMS
 } from './userTypes.js';

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
    signInError: null,
    signUpError: null,
    signUpSuccess: false,
    resetPasswordSuccess: false,
    resetPasswordError: null
};

const userReducer =  (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                signInError: action.payload
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                signInSuccess: action.payload
            };
        case SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: action.payload
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpSuccess: action.payload
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordError: action.payload
            }
        case RESET_AUTH_FORMS:
            return {
                ...state,
                signInSuccess: false,
                signInError: null,
                signUpError: null,
                signUpSuccess: false,
                resetPasswordSuccess: false,
                resetPasswordError: null
            }
        default:
            return state;
    }
};

export default userReducer;