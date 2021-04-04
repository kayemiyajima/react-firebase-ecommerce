import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { signInUser, signInWithGoogle, resetAllAuthForms } from './../../redux/User/userActions';

import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';
import AuthWrapper from './../AuthWrapper';
import Alert from '@material-ui/lab/Alert';

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess,
    signInError: user.signInError
});

const SignIn = () => {
    const { signInError, signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(signInSuccess) {
            clear();
            dispatch(resetAllAuthForms());
            history.push('/');
        }
    }, [signInSuccess]);

    useEffect(() => {
        if(signInError) {
            setError(signInError)
        }
    }, [signInError]);

    const clear = () => {
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleSubmit = (e) => {
         e.preventDefault();
         dispatch(signInUser({ email, password }));
    };

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    };

    const configAuthWrapper = {
        headline: 'LogIn'
    };

    return(
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
                {error && <Alert variant="outlined" severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <div className='manualSignin'>
                        <FormInput 
                            type='email'    
                            name='email'
                            onChange={(e) =>setEmail(e.target.value)}
                            value={email}
                            placeholder='Email'
                            required/>
                        <FormInput
                            type='password'
                            name='password'
                            onChange={(e) =>setPassword(e.target.value)}
                            value={password}
                            placeholder='Password'
                            required/>
                        <div className='resetPassword'>
                            <Link to='/recovery'>Forgot password?</Link>
                        </div>
                        <Button type='submit'>
                            Login
                        </Button>
                    </div>
                </form>
                <div className='socialSignin'>
                    <Button className='google-btn' onClick={handleGoogleSignIn}>
                        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
                        <span>Sign in with Google</span>
                    </Button>
                </div>
            </div>
            <div className='routing'>
                Need an account? <Link to ='/registration'>Sign Up</Link>
            </div>
        </AuthWrapper>
    )
};

export default withRouter(SignIn);