import { comparePassword, hashPassword } from "../Helper/userHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


// register controller
export const RegisterController = async (req, res) => {
    try {
        // fetch data
        const { name, email, phone, password, address , answer } = req.body;

        // validate
        if (!name || !email || !phone || !password || !address || !answer) {
            return res.status(400).json({
                success: true,
                message: 'Please fill all fields'
            });
        }
        // check existing user
        const UserExisting = await userModel.findOne({ email });
        if (UserExisting) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists. Please Login!!'
            })
        }
        // hashing password
        const hashedPassword = await hashPassword(password);

        const register = await new userModel({ name, email, password:hashedPassword, phone, address , answer }).save();

        return res.status(200).json({
            success: true,
            message: "User Register Successfully!!",

            register
            
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while Register user",
            error,
        })
    }
};

// login controller

export const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;
        // field validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            })
        }
        // check user existing
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email is not register, Please register first",
            })
        }

        // compare with password
        const matchPass = await comparePassword(password, user.password);
        if (!matchPass) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password!"
            })
        };

        // token
        const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "User login successfully!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                // password: user.password,
            },
            token,
        });
        
    } catch (error) {
        console.log("Error in login ", error);
        return res.status(500).json({
            success: false,
            message: "Error while Login, Please try again!",
            error,
            
        });
    }
};


// text controller

export const testController = async (req, res) => {
    res.send("Protected routes!!");
}

// forget password controller

export const forgetPasswordController = async (req, res) => 
{
  try{
    const{email , answer , newPassword} = req.body;
    // field validation
    if(!email ||!answer ||!newPassword){
        return res.status(400).json({
          success: false,
          message: "Please provide all fields"
        })
    }
    // check user existing
    const user = await userModel.findOne({email , answer})
     
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Email is not register, Please register first",
        });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id , {password : hashed});
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while forget password",
      error,
    })
  }

}

// update profile controller

export const updateProfileController = async(req , res)=>{
    try{
        const{name , email , password , address , phone} = req.body;
        const user = await userModel.findById(req.user._id);
        if(password && password.length <6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            })
        }
        // hashed Password
        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updateUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { name : name || user.name,
                password : hashedPassword || user.password,
            //   email : email || user.email,
                phone : phone || user.phone,
                address : address || user.address,
            },
            {new : true}
        );
        res.status(200).send({
            success: true,
            message: "User Update Successfully",
            user: updateUser
        });
       
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Errro in Update-User-Profile",
        });
    }
}

// get order

export const getOrdersController = async(req ,res)=>{
    try{
        const orders = await 
        orderModel.find({buyer : req.user._id}).populate("products" , "-photo").populate("buyer" , "name");
        res.status(200).send({
            success: true,
            message: "Get Orders Successfully",
            orders
        });


    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Errro in getting orders",
        });
    }
}

// get All order

export const getAllOrdersController = async(req ,res)=>{
    try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      
    res.json(orders);

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Errro in getting All orders",
        });
    }
}

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};