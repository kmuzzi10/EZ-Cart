import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


//register route
export const registerController = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, password, phone, address ,answer} = req.body;
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

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(404).send({ message: 'email is reqired' })
    }
    if (!answer) {
      res.status(404).send({ message: 'answer is reqired' })
    }
    if (!newPassword) {
      res.status(404).send({ message: 'new password is reqired' })
    }
    //checking
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: 'wrong email or answer'
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: 'password has successfully changed'
    })

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      err
    })

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

