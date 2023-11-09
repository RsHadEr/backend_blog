const express=require('express');
const connectToMongo=require("./db");
const router  = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');

const app=express();
app.use(express.json());
connectToMongo();

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

app.listen(5000);


