
import express from "express";
const router = express.Router();



// controller
import {
    RegisterController,
    loginController,
    testController,
    forgetPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from '../controllers/RegisterController.js';

import { isAdmin, requireSignIn } from "../middleware/AuthMiddleware.js";



//userApi
router.post("/register", RegisterController);
router.post("/login", loginController)
// forget Password

router.post('/forget-password' , forgetPasswordController)

//test Api

router.get('/test' , requireSignIn,isAdmin, testController);


// protected route for user authentication
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected route for Admin authentication
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);
// module.exports = router;

//orders
router.get("/orders", requireSignIn, getOrdersController);

//All- orders
router.get("/All-orders", requireSignIn,isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;