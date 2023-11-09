const User=require('../models/User');
const bcrypt=require('bcryptjs');

const getAllUser=async (req,res,next)=>{
let users;
try{
users=await User.find();
}catch(error){
console.log(error);
}

if(!users)
{
    return res.status(404).json({message:"No user found"});
}

return res.status(200).json({users});

}


const signup=async (req,res,next)=>{
    let {name,email,password}=req.body;
    let existingUser;
    try{

        existingUser=await User.findOne({email});
    }
    catch(err)
    {
        console.log(err);
    }

    if(existingUser)
    {
        return res.status(400).json({message:"Already signed up!!!Please Lolgin"});
    }

    let hashedPassword=bcrypt.hashSync(password);
    const user=new User({
        name,email,password:hashedPassword,blogs:[]
    });

    try{
        await user.save();
    }catch(err)
    {
        return console.log(err);
    }

    return res.status(201).json({user});

    

    
}

const login= async (req,res)=>{
    const {email,password}=req.body;
    let existingUser;
    try{

        existingUser=await User.findOne({email});
    }
    catch(err)
    {
        console.log(err);
    }

    if(!existingUser)
    {
        return res.status(400).json({message:"Create an account First :)"});
    }

    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);

    if(isPasswordCorrect)
    {
        return res.status(200).json({message:"Login Succesful",existingUser});
    }
    else{
        return res.status(400).json({message:"Invalid Credentials"});
    }

}




module.exports={getAllUser,signup,login};
