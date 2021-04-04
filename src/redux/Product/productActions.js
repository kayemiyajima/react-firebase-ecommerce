import { ADD_NEW_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS } from './productTypes';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './productHelper';
import { auth } from './../../firebase/utils';

export const addNewProduct = (productData) => async (dispatch) => {
    try {
        const timestamp = new Date();
        const { productCategory, productName, productThumbnail, productPrice } = productData;
        await handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        dispatch({
            type: ADD_NEW_PRODUCT,
            payload: {
                productCategory,
                productName,
                productThumbnail,
                productPrice,
                productAdminUserUID: auth.currentUser.uid,
                createdDate: timestamp
            }
        })

    } catch (err) {
        console.log(err);
    };
};

export const fetchProducts = () => async (dispatch) => {
    try {
        const products = await handleFetchProducts();

        dispatch({
            type: SET_PRODUCTS,
            payload: products
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteProduct = (documentID) => async (dispatch) => {
    try {
        await handleDeleteProduct(documentID);

        dispatch({
            type: DELETE_PRODUCT,
            payload: documentID
        });
    } catch (err) {
        console.log(err);
    }
}