const express=require('express');
const {getAllBlogs,addBlogs,updateBlogs,getBlogById,deleteBlogById,getUserBlogs}  = require('../controllers/blog-controller');
const blogRouter=express.Router();


blogRouter.get("/",getAllBlogs)
blogRouter.post("/addBlogs",addBlogs);
blogRouter.put("/updateBlog/:id",updateBlogs)
blogRouter.get("/:id",getBlogById);
blogRouter.delete("/:id",deleteBlogById);
blogRouter.get("/user/:id",getUserBlogs);



module.exports=blogRouter;
