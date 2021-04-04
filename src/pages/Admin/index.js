import React from 'react';
import './styles.scss';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './../../firebase/utils'
import AdminComponent from './../../components/AdminComponent';
import VerticalNav from './../../components/VerticalNav';


const Admin = () => {
    const history = useHistory();

    const handleLogout = () => {
        auth.signOut();
        history.push('/')
    }

    return(
        <>
        <div className='admin'>
            <div className="controlPanel">
                <VerticalNav>
                    <ul>
                        <li>
                            <Link to="/admin">
                            Home
                            </Link>
                        </li>
                        <li>
                            <span className="signOut" onClick={handleLogout}>
                            Sign Out
                            </span>
                        </li>
                    </ul>
                </VerticalNav>
            </div>
            <div className="adminContent">
                <AdminComponent />
            </div>
        </div>
        </>
    );
}

export default Admin;
