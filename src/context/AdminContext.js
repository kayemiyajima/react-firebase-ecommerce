// import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import { checkUserIsAdmin } from './../firebase/utils'


// const useAdminAuth = () => {
//     const { currentUser } = useAuth();
//     const history = useHistory();
    
//     useEffect(() => {
//         if (!checkUserIsAdmin(currentUser)){
//             history.push('/login');
//         }
//     }, [currentUser, history]);

//     return currentUser;
// }

// export default useAdminAuth;