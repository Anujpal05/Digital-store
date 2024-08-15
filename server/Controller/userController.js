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

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        //Signin successfully
        return res.status(200).json({
          message: "SignIn successfully!",
          id: existingUser._id,
          role: existingUser.role,
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
