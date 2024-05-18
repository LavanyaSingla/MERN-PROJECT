const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controller/productController');
const { isAuthenticatedUser,isAuthorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser,isAuthorizeRoles("admin"),createProduct);
router.route('/product/:id').put(isAuthenticatedUser,isAuthorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,isAuthorizeRoles("admin"),deleteProduct).get(getProductDetails);
module.exports = router;