import React, { useState } from 'react';
import './styles.scss';
import Button from './../Forms/Button'
import { useAuth } from './../../context/AuthContext'
import { useHistory, Link } from 'react-router-dom';

import AuthWrapper from './../AuthWrapper';
import Alert from '@material-ui/lab/Alert';

const SignIn = () => {
    const { signInWithGoole, login } = useAuth();
    const history = useHistory();

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clear = () => {
        setEmail('')
        setPassword('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('')
            await login(email, password).then(() => {
                history.push('/')
            });
            clear();
        } catch {
            setError('Failed to sign in')
        }
    }

    const configAuthWrapper = {
        headline: 'LogIn'
    };

    return(
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
            {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <div className='manualSignin'>
                        <input 
                            type='email'
                            name='email'
                            onChange={(e) =>setEmail(e.target.value)}
                            value={email}
                            placeholder='Email'
                            required/>
                        <input 
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
                            <Button className='google-btn' onClick={signInWithGoole}>
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

export default SignIn;