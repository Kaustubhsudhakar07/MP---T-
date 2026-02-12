const { TokenExpiredError } = require('jsonwebtoken');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');


const home = async (req, res) => {
    return res.send("Welcome");
}
const register = async (req, res) => {
    try{
        const { username, email, password, phoneNumber } = req.body;
        if(!username || !email || !password || !phoneNumber){
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user already exists
        const UserExist = await User.findOne({email });
        if(UserExist){
            return res.status(400).json({ message: "User already exists" });
        }

        
        
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
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate token
        const token = await user.generateToken();
        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id.toString()
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = {
    home,
    register,
    login
}