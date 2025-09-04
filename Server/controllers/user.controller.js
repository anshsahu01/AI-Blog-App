import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { verifyCaptcha } from "../Configs/captcha.js";




//methods to generate access and refresh tokens

const generateAccessandRefreshTokens = async (userId) => {
    try {
        const user = await User.findOne(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({validateBeforeSave : false});

        return {accessToken, refreshToken};

        
    } catch (error) {
        return res.json({
            success : false,
            message : "Something went wrong while generating refresh and access token"
        })
        
    }
}

// export const registerUser = async (req, res) => {
//   try {
//     console.log(req.body);
//     // take details from frontend through req
//     // then check whether user is aleready registered or not
//     // if not then create a new object and save on db
//     // then return the response

//     const { name, email, password } = req.body;

//     if (
//       [name, email, password].some((field) => !field || field.trim() === "")
//     ) {
//       return res.json({
//         status: 400,
//         success: false,
//         message: "All fields are necessary",
//       });
//     }

//     //Checked if all details are present or not

//     // now check if the user aleready exist or not

//     const existedUser = await User.findOne({
//       $or: [{ name }, { email }],
//     });

//     if (existedUser) {
//       return res.json({
//         status: 409,
//         success: false,
//         message: "User with email or name aleready exists",
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     // check whether user is created or not

//     const createdUser = await User.findById(user._id).select(
//       "-password -refreshToken"
//     );

//     // now generate access and refresh token
//    const accessToken = user.generateAccessToken();
//    if(!accessToken){
//     console.log("Problem in generating access token");
//    }
    

//     console.log("----CREATED USER----",createdUser);
    

//     if (!createdUser) {
//       return res.json({
//         status: 201,
//         success: false,
//         message: "Something went wrong while registering user",
        
//       });
//     }

//     return res.json({
//       success: true,
//       message: "User registered Successfully",
//        user :createdUser,
//        accessToken
  
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, captchatoken  } = req.body;

    // checking for the verification of the captcha
    const captchaResponse = await verifyCaptcha(captchatoken);
    if(!captchaResponse.success){
      return res.json({
        success : false,
        message : "Captcha verification failed. Please confirm you are not a robot"
      })
      
    }

    if ([name, email, password].some((field) => !field || field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All fields are necessary",
      });
    }

    const existedUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "User with email or name already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // remove password from response
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while registering user",
      });
    }

    

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser,

    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name && !email) {
      return res.status(400).json({
        success: false,
        message: "name or email is required",
      });
    }

    
    const user = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

  
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid user credentials",
      });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true, // only on HTTPS (set false for localhost if needed)
       sameSite: "strict",
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged in successfully",
      });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({
      success: false,
      message:error.message,
    });
  }
};



export const logoutUser = async (req, res) => {
  try {
    console.log(req.body);

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set : {
          refreshToken : undefined
        }
      },
      {
        new : true
      }
    )

    const options = {
      httpOnly : true,
      secure : false,
    }

    return res
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
      success : true,
      message : "User logged out successfully"
    })
    
  } catch (error) {
    console.log("---ERROR IN LOGOUT-----");

    return res.json({
      success : false,
      message : error.message
    })
    
  }
}



// controller for follow funtionality

export const followUser = async (req,res) => {
  try {
     const targetUserId = req.params.id; // jisko follow karna hai
     const currentuserId = req.body.userId; // jo user follow kar rha hai
     const targetUser = await User.findById(targetUserId); 
     // check karenge ki user khud ko hi na follow karle
     if( currentuserId.toString() === targetUserId.toString()){
      return res.json({
        success : false,
        message : "User cannot follow itself"
      })
     }

     // ab check karenge ki user ke following data mein target user hai ya nhi

     if(targetUser.followers.includes(currentuserId)){
      return res.json({
        success : false,
        message : "Already Followed"
      })
     }

      targetUser.followers.push(currentuserId);
      await targetUser.save();

      const currentUser = await User.findById(currentuserId);
      currentUser.following.push(targetUserId);
      await currentUser.save();

      

      res.json({
        success : true,
        message : "User followed successfully",
        followersCount : targetUser.followers.length,
        followingCount : currentUser.following.length
      })
  } catch (error) {

    return res.json({
      success : false,
      message : error.message
    })
    
  }
}



// controller to unfollow user

export const unfollowUser = async (req,res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.body.userId;

    if(targetUserId.toString() === currentUserId.toString()){
      return res.json({
        success : false,
        message : "user cannot unfollow itself"
      })

    }

    const targetUser = await User.findById(targetUserId);
    if(!targetUser){
      return res.json({
        success : false,
        message : "User not available"
      })
    }


    if(!targetUser.followers.includes(currentUserId)){
      return res.json({
        success : false,
        message : "User not in the follow list"
      })
    }

    // ismein .filter method ka use karenge

    targetUser.followers = targetUser.followers.filter((id)=>(
       id!== currentUserId
    ))

    await targetUser.save();

    const currentUser = await User.findById(currentUserId);
    currentUser.following = currentUser.following.filter((id) => (
      id!== targetUserId
    ))

    await currentUser.save();


    return res.json({
      success : true,
      message : "Unfollowed Successfully",
      followersCount : targetUser.followers.length,
      followingCount : currentUser.following.length
    })

    
  } catch (error) {
    return res.json({
      success : false,
      message : error.message

    })
  }
}


// controller to fetch followers

// const fetchFollowers = async (req,res) => {

//   try {

//     const userId = req.body.userId || req.params.id;

//     const user = await User.findById(userId);

//     if(!user){
//       return res.json({
//         success : false,
//         message : "User not available"
//       })
//     }
    
//   } catch (error) {
    
//   }
// }

