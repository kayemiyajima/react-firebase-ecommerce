import React, { useState, useRef } from 'react';
import './styles.scss';
import Button from './../Forms/Button';
import { handleUserProfile } from './../../firebase/utils';
import { useAuth } from './../../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';

import AuthWrapper from './../AuthWrapper';
import Alert from '@material-ui/lab/Alert';


const Signup = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const history = useHistory()

    const clear = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            const { user } = await signup(emailRef.current.value, passwordRef.current.value);
            await handleUserProfile(user, { displayName });
            clear();
            history.push('/')
        } catch {
            setError('Failed to create an account')
        }

        // setLoading(false)
    }

    const configAuthWrapper = {
        headline: 'Register'
    }

    return(
        <>
            <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>
                {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type='text'
                            name='displayName'
                            onChange={(e) => {setDisplayName(e.target.value)}}
                            value={displayName}
                            placeholder='Full name'
                            required/>
                        <input 
                            type='email'
                            name='email'
                            ref={emailRef}
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            placeholder='Email'
                            required/>
                        <input 
                            type='password'
                            name='password'
                            ref={passwordRef}
                            onChange={(e) => {setPassword(e.target.value)}}
                            value={password}
                            placeholder='Password'
                            required/>
                        <input 
                            type='password'
                            name='passwordConfirm'
                            ref={passwordConfirmRef}
                            onChange={(e) => {setPasswordConfirm(e.target.value)}}
                            value={passwordConfirm}
                            placeholder='Password Confirm'
                            required/>
                        
                        <Button type='submit'>
                            Sign up
                        </Button>
                    </form>
                </div>
                <div className='routing'>
                    Already have an account? <Link to='/login'>Log In</Link>
                </div>
            </AuthWrapper>
        </>
    )
}

export default Signup;