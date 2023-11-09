const  mongoose  = require("mongoose");
const Blog=require("../models/Blog");
const User=require("../models/User");


const getAllBlogs= async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find();

    }catch(err)
    {
        console.log(err);
    }

    if(!blogs)
    {
        return res.status(400).json({message:"No blog found"});
    }

    return res.status(200).json({blogs});
}


const addBlogs=async(req,res,next)=>{
    const {title,description,image,user}=req.body;
 let existingUser;
 try{
    existingUser= await User.findById(user);
 }catch(err)
 {
    return console.log(err);
 }

 if(!existingUser)
 {
    return res.status(400).json({message:"Unable to Find User"});
 }


    let blog=new Blog({title,description,image,user});

try{
    // const session=await mongoose.startSession();
    // session.startTransaction();
    await blog.save();
    existingUser.blogs.push(blog);
     await existingUser.save();
    //  await session.commitTransaction();

}
catch(err){
    console.log(err);
}

return res.status(200).json({message:"new Blog created",blog});


}


const updateBlogs=async(req,res,next)=>{
    const {title,description}=req.body;
    const blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogId,{title,description});
    }catch(err)
    {
        console.log(err);
    }
    if(!blog)
    {
        return res.status(500).json({message:"unable to update blog"});
    }
    return res.status(200).json({message:"updateComplete",blog});
}

const getBlogById=async(req,res,next)=>{
    let blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findById(blogId);

    }catch(err)
    {
        return console.log(err);
    }

    if(!blog)
    return res.status(400).json({message:"No Blog"});

    return res.status(200).json({blog});
}

const deleteBlogById=async(req,res,next)=>{
    let blogId=req.params.id;
    let blogs;
    try{
        blogs=await Blog.findByIdAndRemove(blogId).populate("user");
        await blogs.user.blogs.pull(blogs);
        await blogs.user.save();
    }
    catch(err)
    {
        return console.log(err);
    }

    if(!blogs)
    {
        return res.status(400).json({message:"Incorrect Credentials"})
    }
    return res.status(200).json({message:"Deleted Successfully"});
}

const getUserBlogs=async (req,res,next)=>{
    let userId=req.params.id;
    let userBlogs;
    try{

        userBlogs=await User.findById(userId).populate('blogs');
    }
    catch(err)
    {
        return console.log(err);

    }

    if(!userBlogs)
    {
        return res.status(400).json({message:"Not Blogs found"});
    }
    return res.status(200).json({message:"Blogs found",userBlogs});
}



module.exports={getAllBlogs,addBlogs,updateBlogs,getBlogById,deleteBlogById,getUserBlogs};
