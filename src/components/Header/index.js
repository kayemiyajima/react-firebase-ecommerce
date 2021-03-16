import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom'
import Logo from './../../assets/logo.png'
import { useAuth } from './../../context/AuthContext'

const Header = () => {
    const { logout, currentUser } = useAuth();

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
                                <span onClick={logout}>LogOut</span>
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
}

export default Header;
