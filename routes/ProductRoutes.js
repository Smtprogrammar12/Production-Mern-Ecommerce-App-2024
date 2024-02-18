import  express  from "express";
const router = express.Router();
import formidable from "express-formidable";
import { isAdmin, requireSignIn } 
from "../middleware/AuthMiddleware.js";
import { createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  productFilterController,
  updateProductController,
  deleteProductController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,

 } from "../controllers/productController.js";


// create product routes

router.post('/create-product' ,
requireSignIn , 
isAdmin,
 formidable() ,
  createProductController)

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

// update routes

router.put('/update-product/:pid', updateProductController)

// filter product

router.post('/product-filters', productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;