import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, fetchProducts, deleteProduct } from './../../redux/Product/productActions'

import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import FormSelect from './../Forms/FormSelect';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ productsData }) => ({
    products: productsData.products
});


const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

const AdminComponent = () => {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
//   const [productDesc, setProductDesc] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    },[]);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const resetForm = () => {
        setProductCategory('mens');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addNewProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice
        }));
        resetForm();
        dispatch(fetchProducts());
    };

    
    return (
        <div className='adminComponent'>
            <div className='callToAction'>
                <Button onClick={handleOpen}>
                    Add new product
                </Button>
            </div>

            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={open}>
                <AuthWrapper>
                    <div className='formWrap'>
                        <form onSubmit={handleSubmit}>
                            <h2>
                                Add new product
                            </h2>

                            <FormSelect
                                label="Category"
                                options={[{
                                    value: "mens",
                                    name: "Mens"
                                }, {
                                    value: "womens",
                                    name: "Womens"
                                }]}
                                onChange={(e) => {setProductCategory(e.target.value)}}
                            />

                            <FormInput 
                                label='Name'
                                type="text"
                                value={productName}
                                required
                                onChange={(e) => {setProductName(e.target.value)}}
                            />

                            <FormInput 
                                label='Main image URL'
                                type="url"
                                value={productThumbnail}
                                required
                                onChange={(e) => {setProductThumbnail(e.target.value)}}
                            />

                            <FormInput 
                                label='Price'
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="0.01"
                                value={productPrice}
                                required
                                onChange={(e) => {setProductPrice(e.target.value)}}
                            />
                            
                            <Button type='submit'>
                                ADD PRODUCT
                            </Button>
                        </form>
                    </div>
                </AuthWrapper>
            </Fade>
        </Modal>


    {/* //         <CKEditor
    //           onChange={evt => setProductDesc(evt.editor.getData())}
    //         />

    //         <br /> */}

      <div className="manageProducts">

        <table border="0" cellPadding="10" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage Products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {products.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} alt={productName} />
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            ${productPrice}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteProduct(documentID))}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            {/* <tr>
              <td>

              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr> */}
          </tbody>
        </table>

      </div>

    </div>
)};

export default AdminComponent;