const { TokenExpiredError } = require('jsonwebtoken');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');


const home = async (req, res) => {
    return res.send("Welcome");
}
const register = async (req, res) => {
    try{
        const { username, email, password, phoneNumber } = req.body;
        console.log("REGISTER DATA:", { username, email, password, phoneNumber });
        if(!username || !email || !password || !phoneNumber){
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user already exists
        const UserExist = await User.findOne({email });
        if(UserExist){
            return res.status(400).json({ message: "User already exists" });
        }

        console.log("REGISTER BODY:", req.body);
        
        // Create new user
         const userCreated =  await User.create({
            username,
            email,
            password,
            phoneNumber
        });

       const token = await userCreated.generateToken();

  res.status(201).json({
  message: "User registered successfully",
  token,
  userId: userCreated._id.toString()
});


    } catch (error) {
  console.error("FULL REGISTER ERROR 👇");
  console.error(error);
  return res.status(500).json({
    message: error.message,
    name: error.name,
    stack: error.stack,
  });
}

}

const login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input FIRST
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Compare password safely
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate token
    console.log("BEFORE TOKEN");
const token = await user.generateToken();
console.log("AFTER TOKEN", token);

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id.toString(),
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    home,
    register,
    login
}