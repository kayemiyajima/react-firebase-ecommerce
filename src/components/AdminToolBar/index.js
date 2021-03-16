import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { useAuth } from './../../context/AuthContext'

const AdminToolBar = () => {
    const { currentUser } = useAuth();
    const checkUserIsAdmin = (currentUser) => {
        if (!currentUser || !Array.isArray(currentUser.userRoles))
            return false

        const { userRoles } = currentUser;
        if (userRoles.includes('admin'))
        return true;
    }

    const isAdmin = checkUserIsAdmin(currentUser);
    if(!isAdmin) return null;
    
    return(
        <div className='adminToolBar'>
            <ul>
                <li>
                    <Link to='/admin'>
                        My Admin
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default AdminToolBar;