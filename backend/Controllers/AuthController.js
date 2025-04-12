const bcrypt = require('bcryptjs');
const UserModel = require("../Models/user");

const signup = async(req,res)=>{
    try{
        const {name,username,email,password,mobile} = req.body;
        const existuser = await UserModel.findOne({ email });
        if(existuser){
            return res.status(409).json({message:"user is already existing , you can login ",success :false});
        }
        const newUser = new UserModel({ name , username , email, password , mobile });
        newUser.password = await bcrypt.hash(password,10);
        console.log("New User Data:", newUser);
        await newUser.save();
        console.log("User saved to the database");

        res.status(201).json({message:"Signup successful",success:true});
    }
    catch (err){
        res.status(500).json({message:"Internal server error",success:false});
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const existuser = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is incorrect';
        if(!existuser){
            return res.status(409).json({message:errorMsg,success :false});
        }
        const isPassEqual = await bcrypt.compare(password, existuser.password);
        if(!isPassEqual){
            return res.status(409).json({message:errorMsg,success :false});
        }
        res.status(200).json({
            message:"Login successful",
            success:true,
            email,
            name:existuser.name
        });
    }
    catch (err){
        res.status(500).json({message:"Internal server error",success:false});
    }
}

const getUserDetails = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: "Email is required in query", success: false });
    }

    try {
        const user = await UserModel.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login,
    getUserDetails
}
