import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAuth = () => {
    const { currentUser } = useSelector(mapState);
    console.log(currentUser);
    const history = useHistory();

    useEffect(() => {
        if(!currentUser) {
            history.push('/login')
        }
    },[currentUser, history])
    return currentUser;
};

export default useAuth;