import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import { auth } from './../../firebase/utils';
import { Link } from 'react-router-dom';
import Logo from './../../assets/logo.png';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = () => {
    const { currentUser } = useSelector(mapState);
    return (
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt='logo' />
                    </Link>
                </div>

                <div className='callToActions'>
                    {currentUser ? 
                        <ul>
                            <li>
                                <Link to='/dashboard'>
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <span onClick={() => auth.signOut()}>LogOut</span>
                            </li>
                        </ul> 
                    :
                        <ul>
                            <li>
                                <Link to='/registration'>
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </li>
                        </ul>
                    }                    
                </div>

            </div>
        </header>
    )
};

export default Header;
