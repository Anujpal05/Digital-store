import { generateJWToken } from "../Auth/auth.js";
import User from "../Model/userModel.js";
import bcrypt from "bcrypt";

//Register controller
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ message: "User is already exist!" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 4!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User is not found!" });
    }

    await bcrypt.compare(password, existingUser.password, async (err, data) => {
      if (data) {
        const payload = {
          id: existingUser._id,
          role: existingUser.role,
          username: existingUser.username,
        };

        const token = await generateJWToken(payload);

        //Signin successfully
        return res.status(200).json({
          message: "SignIn successfully!",
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        //Invalid Password
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    //Internal server error
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Update User Information
export const updateUser = async (req, res) => {
  try {
    const { username, address, phone } = req.body;
    const { id } = req.headers;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!username || !address || !phone) {
      return res.status(400).json({ message: "Please provide all fields!" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must be greater than 4" });
    }
    if (address.length < 10) {
      return res
        .status(400)
        .json({ message: "Address must be greater than 9" });
    }

    if (phone.length != 10) {
      return res
        .status(400)
        .json({ message: "Phone no. must be exactly 10 digits " });
    }

    await User.findByIdAndUpdate(id, {
      username: username,
      address: address,
      phone: phone,
    });

    return res
      .status(200)
      .json({ message: "User Information updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Getting all user
export const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });
    if (!allUsers) {
      return res.status(404).json({ message: "No any user exist!" });
    }

    return res
      .status(200)
      .json({ message: "Getting All User information!", allUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
