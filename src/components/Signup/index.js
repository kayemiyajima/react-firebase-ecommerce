import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter, Link } from 'react-router-dom';
import './styles.scss';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';
import { signUpUser, resetAllAuthForms } from './../../redux/User/userActions';

import AuthWrapper from './../AuthWrapper';
import Alert from '@material-ui/lab/Alert';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const Signup = () => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] =useState('')

    useEffect(() => {
        if(signUpSuccess) {
            clear();
            dispatch(resetAllAuthForms());
            history.push('/');
        }
    },[signUpSuccess]);

    useEffect(() => {
        if(signUpError) {
            setError(signUpError)
        }
    },[signUpError]);

    const clear = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setError('')
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(signUpUser({ displayName, email, password, passwordConfirm }));
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
                        <FormInput
                            type='text'
                            name='displayName'
                            onChange={(e) => {setDisplayName(e.target.value)}}
                            value={displayName}
                            placeholder='Full name'
                            required
                        />
                        <FormInput 
                            type='email'
                            name='email'
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            placeholder='Email'
                            required
                        />
                        <FormInput 
                            type='password'
                            name='password'
                            onChange={(e) => {setPassword(e.target.value)}}
                            value={password}
                            placeholder='Password'
                            required
                        />
                        <FormInput
                            type='password'
                            name='passwordConfirm'
                            onChange={(e) => {setPasswordConfirm(e.target.value)}}
                            value={passwordConfirm}
                            placeholder='Password Confirm'
                            required
                        />
                        
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

export default withRouter(Signup);