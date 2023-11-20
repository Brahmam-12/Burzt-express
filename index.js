const express = require('express');//express for building the web applications
const mongoose = require('mongoose');//mongoDb object modeling tool
const studentRouter = require('./routes/studentRouter')// this router module can handle the student related routes
const cors = require('cors');// middlewar for enabling cors

//App initilization
const app = express();//Creates an instance of the Express application.

app.use(express.json());//parses incoming JSON data and makes it available in req.body.
app.use(cors({
     origin:'*',
     methods:'*',
     allowedHeaders:'*',
     exposedHeaders:'*'
}));                    //CORS to allow requests from any origin
app.use('/students', studentRouter);

const connectDb = async()=>{
     const url = 'mongodb+srv://Brahmam123:burzt@cluster0.86m7b3p.mongodb.net/Burzt?retryWrites=true&w=majority'
     try{
         await mongoose.connect(url);
         console.log("DB Connected")
     }catch(error){
         console.log(error)
     }
}
connectDb()
app.listen(8000, ()=>console.log("Server Is Running On 8000 Port"));