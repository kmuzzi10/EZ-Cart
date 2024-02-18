import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


//register route
export const registerController = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.status(400).json({ message: "Name is Required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.status(400).json({ message: "Address is Required" });
    }
    if (!answer) {
      return res.status(400).json({ message: "Answer is Required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register the user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};



//login route for login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }
    if (!answer) {
      return res.status(400).send({ message: 'Answer is required' });
    }
    if (!newPassword) {
      return res.status(400).send({ message: 'New password is required' });
    }

    // Check if user exists with the provided email and answer
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Wrong email or answer'
      });
    }

    // Hash the new password
    const hashed = await hashPassword(newPassword);

    // Update user's password
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    // Send success response
    res.status(200).send({
      success: true,
      message: 'Password has been successfully changed'
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      err
    });
  }
}

//get user controller

export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({})
    res.status(200)
    res.json(users)
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      err
    });
  }
}

//update profile controller

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, address, password, phone } = req.body
    const user = await userModel.findById(req.user._id)
    //pass
    if (password && password.length < 6) {
      return res.json({ error: "password is required and six characters long" })
    }
    const hashedPassword = password ? await hashPassword(password) : undefined
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
      name: name || user.name,
      password: hashedPassword || user.password,
      phone: phone || user.phone,
      address: address || user.address
    }, { new: true })

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "something went wrong updating profile",
      err
    })
  }
}

//order controller

export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name").populate("status");
    res.json(orders)
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "something went wrong in getting orders",
      err
    })
  }
}

//get all orders controller

export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel.find({})
      .populate("products", "-photo")
      .populate({
        path: "buyer",
        select: "name address" // Include both name and address fields
      })
      .populate("status")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error in getting orders:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in getting orders",
      error: err.message // Instead of full error object, sending only the error message
    });
  }
};



//update order controller

export const updateOrderController = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
    res.status(200)
    res.json(orders)
  } catch (err) {
    console.error("Error in getting orders:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in getting orders",
      error: err.message // Instead of full error object, sending only the error message
    });
  }
}
















//test controller

export const testController = async (req, res) => {
  try {
    res.send('protected')
  } catch (err) {
    console.log(err)
  }
}

