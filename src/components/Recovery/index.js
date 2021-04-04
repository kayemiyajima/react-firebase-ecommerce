import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { resetPassword, resetAllAuthForms } from './../../redux/User/userActions';

import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';
import AuthWrapper from './../AuthWrapper';
import Alert from '@material-ui/lab/Alert';

const mapState =({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const Recovery = () => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if(resetPasswordSuccess) {
            setMessage('Check your inbox for further instructions');
            dispatch(resetAllAuthForms());
        }
    },[resetPasswordSuccess])

    useEffect(() => {
        if(resetPasswordError) {
            setError(resetPasswordError)
        }
    },[resetPasswordError])

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(resetPassword(email));
    };

    const configAuthWrapper = {
        headline: 'Password Reset'
    };

    return(
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        type='email'
                        name='email'
                        placeholder='Email'
                        value ={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        required
                    />                    
                    <Button type='submit'>
                        Reset Password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
};

export default Recovery;