import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    // take details from frontend through req
    // then check whether user is aleready registered or not
    // if not then create a new object and save on db
    // then return the response

    const { name, email, password } = req.body;

    if (
      [name, email, password].some((field) => !field || field.trim() === "")
    ) {
      return res.json({
        status: 400,
        success: false,
        message: "All fields are necessary",
      });
    }

    //Checked if all details are present or not

    // now check if the user aleready exist or not

    const existedUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existedUser) {
      return res.json({
        status: 409,
        success: false,
        message: "User with email or name aleready exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // check whether user is created or not

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    console.log("----CREATED USER----",createdUser);

    if (!createdUser) {
      return res.json({
        status: 201,
        success: false,
        message: "Something went wrong while registering user",
      });
    }

    return res.json({
      success: true,
      message: "User registered Successfully",
      createdUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};



export const loginUser = async (req, res) => {
    try {
        
        
    } catch (error) {
        
    }
}
