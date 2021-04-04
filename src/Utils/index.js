export const checkUserIsAdmin = (currentUser) => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) {
        console.log('failed');
        return false;

    } else {
        const { userRoles } = currentUser;
        if (userRoles.includes('admin')) {
            console.log('its admin');
            return true;
        } else {
            return false;
        }
    }
};