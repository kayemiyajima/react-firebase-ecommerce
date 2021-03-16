import React, { useState, useRef } from 'react';
import './styles.scss';
import { useAuth } from './../../context/AuthContext';
import Button from './../Forms/Button';

import AuthWrapper from './../AuthWrapper';
import Alert from '@material-ui/lab/Alert';

const Recovery = () => {
    const { resetPassword } = useAuth();
    const emailRef = useRef();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password')
        }
    }

    const configAuthWrapper = {
        headline: 'Password Reset'
    }
    return(
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type='email'
                        name='email'
                        ref={emailRef}
                        placeholder='Email'
                        required/>                    
                    <Button type='submit'>
                        Reset Password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
};

export default Recovery;