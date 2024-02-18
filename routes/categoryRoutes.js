import express from "express";
const router = express.Router();
import {isAdmin , requireSignIn} from "./../middleware/AuthMiddleware.js"
import { createCategoryController ,
updateCategoryController,
AllcategoryControlller,
singleCategoryController,
deleteCategoryCOntroller,}
 from "../controllers/categoryController.js";


// create Category route

router.post("/create-category" , 
//isAdmin , 
requireSignIn , 
createCategoryController );


//update category
router.put(
  "/update-category/:id",
  requireSignIn,
 // isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", AllcategoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);


//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;