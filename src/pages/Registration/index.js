import React, { Component } from 'react';
import Signup from '../../components/Signup';
import './styles.scss';

class Registration extends Component {

    render() {
        return (
            <div className='registration'>
                <Signup />
            </div>
        )
    }
}

export default Registration;
