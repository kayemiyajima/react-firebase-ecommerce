import { ADD_NEW_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS, SET_PRODUCTS } from './productTypes';

const INITIAL_STATE = {
    products: [],
    product: {}
}

const productReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                product: action.payload
            };

        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        case FETCH_PRODUCTS:
            return {
                ...state
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.documentID !== action.payload)
            };

        default:
            return state;
    }
}
export default productReducer;