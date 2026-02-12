const mongoose = require("../config/mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: false}
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return ;  
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    
  } catch (err) {
    console.error("Error hashing password:", err);
  }
});
//json web token 

userSchema.methods.generateToken= async function() {
  try {
    const token = jwt.sign({ 
      userId: this._id.toString(),
      email: this.email, 
      isAdmin: this.isAdmin },
      process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
  catch (err) {
    console.error("Error generating token:", err);
    throw err;
  }
}

module.exports = mongoose.model("User", userSchema);
