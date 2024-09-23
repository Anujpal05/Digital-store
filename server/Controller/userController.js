import { generateJWToken } from "../Auth/auth.js";
import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";

//Register controller
export const registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
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

    if (role === "salesman") {
      const newUser = new User({
        username: username,
        email: email,
        password: hashPassword,
        verify: false,
        role: role,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ message: "Your request send successfully!", newUser });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    const payload = {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    };
    const token = generateJWToken(payload);

    return res
      .status(200)
      .json({ message: "User registered successfully!", token });
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

    if (existingUser.verify === false) {
      return res.status(403).json({ message: "Salesman not verified!" });
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

    if (phone.toString().length != 10) {
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
    const { user } = req.body;
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }
    const allUsers = await User.find({ verify: true })
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

export const getUser = async (req, res) => {
  try {
    const { userid } = req.headers;
    if (!userid) {
      return res.status(404).json({ message: "Please, Provide userId! " });
    }

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User found!", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAllSalesman = async (req, res) => {
  try {
    const { user } = req.body;
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }
    const allUsers = await User.find({ verify: true, role: "salesman" })
      .select("-password")
      .sort({ createdAt: -1 });
    if (!allUsers) {
      return res.status(404).json({ message: "No any salesman exist!" });
    }

    return res
      .status(200)
      .json({ message: "Getting All Salesman information!", allUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getSalesmanRequest = async (req, res) => {
  try {
    const { user } = req.body;
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }
    const allUsers = await User.find({ verify: false, role: "salesman" })
      .select("-password")
      .sort({ createdAt: -1 });
    if (!allUsers) {
      return res
        .status(404)
        .json({ message: "Not get any request for new salesman!" });
    }

    return res
      .status(200)
      .json({ message: "Getting All request for new salesman!", allUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateVerification = async (req, res) => {
  try {
    const { user, verify } = req.body;
    const { id } = req.headers;
    const salesman = await User.findById(id);
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }

    if (!salesman) {
      return res.status(404).json({ message: "Salesman not found!" });
    }
    await User.findByIdAndUpdate(id, {
      verify: verify,
    });

    if (!verify) {
      return res.status(200).json({ message: "Salesman Unverified!" });
    }

    return res.status(200).json({ message: "Salesman verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, phone, address } = req.body;
    const { id } = req.headers;
    const userData = {
      username,
      phone,
      address,
    };

    if (req.file) {
      userData.avatar = `/uploads/${req.file.filename}`;
    }

    if (!username || !phone || !address) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields!" });
    }

    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must be greater than 4!" });
    }

    if (address.length < 10) {
      return res
        .status(400)
        .json({ message: "Address must be greater than 10!" });
    }

    if (phone.toString().length != 10) {
      return res
        .status(400)
        .json({ message: "Phone number should have exactly 10 digit!" });
    }

    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return res
      .status(200)
      .json({ message: "User Profile updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
