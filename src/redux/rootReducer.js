import { combineReducers } from 'redux';

import userReducer from './User/userReducer';
import productReducer from './Product/productReducer';

export default combineReducers({
    user: userReducer,
    productsData: productReducer
})
