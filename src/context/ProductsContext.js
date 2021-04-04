// import React, { useContext } from 'react';
// import { handleAddProduct } from './../firebase/utils';
// import { auth } from './../firebase/utils'

// const ProductsContext = React.createContext();

// export const useProducts = () => {
//     return useContext(ProductsContext);
// }

// export const ProductsProvider = ({ children }) => {

//     const addNewProduct = ({
//         productCategory,
//         productName,
//         productThumbnail,
//         productPrice
//     }) => {
//         try {
//             const timestamp = new Date();
//             handleAddProduct({
//                 productCategory,
//                 productName,
//                 productThumbnail,
//                 productPrice,
//                 productAdminUserUID: auth.currentUser.uid,
//                 createdDate: timestamp
//             })
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     const value = {
//         addNewProduct
//     }

//     return (
//         <ProductsContext.Provider value={value}>
//             {children}
//         </ProductsContext.Provider>
//     )
// }
