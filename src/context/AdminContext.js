import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';


const useAdminAuth = () => {
    const { currentUser } = useAuth();
    const history = useHistory();
    const checkUserIsAdmin = (currentUser) => {
        if (!currentUser || !Array.isArray(currentUser.userRoles))
            return false

        const { userRoles } = currentUser;
        if (userRoles.includes('admin'))
        return true;
    }

    useEffect(() => {
        if (!checkUserIsAdmin(currentUser)){
            history.push('/login');
        }
    }, [history, currentUser])

    return currentUser;
}

export default useAdminAuth;