import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


//register route
export const registerController = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.status(400).json({ error: "Name is Required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).json({ error: "Phone no is Required" });
    }
    if (!address) {
      return res.status(400).json({ error: "Address is Required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
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
        adddress: user.address,
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



//test controller

export const testController = async (req, res) => {
  try {
    res.send('protected')
  } catch (err) {
    console.log(err)
  }
}

