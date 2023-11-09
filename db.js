const mongoose=require('mongoose');

const mongoUri="mongodb://127.0.0.1/"


const connectToMongo=async ()=>{
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoUri,{dbName: 'Blog'});
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
 
}



module.exports=connectToMongo;
