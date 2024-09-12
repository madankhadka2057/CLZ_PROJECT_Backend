const express=require("express")
const app=express()
const cors=require('cors')
app.use(cors({origin:"*"}))
app.use(express.json())//convert request data to json formet
app.use(express.urlencoded({extended:true}))

// const allowedOrigin = 'http://localhost:5173';
// const corsOptions = {
//     origin: allowedOrigin,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   };
//   app.use(cors(corsOptions));


const adminSeeder = require("./adminSeed")
require('dotenv').config();//set environment for .env
const PORT=process.env.PORT||3000
const authRoute=require("./routers/auth/authRoute")
const productRoute=require('./routers/admin/productRoute')
const cartRoute=require('./routers/auth/cartRoute')
const contactRouter=require('./routers/user/contactUsRoute')
const orderRoute=require('./routers/user/orderRoute')
const userRoute=require('./routers/admin/userRoute')
app.use("/auth",authRoute)
app.use('/admin/',productRoute)
app.use('/admin/user',userRoute)
app.use('/cart',cartRoute)
app.use('/user',contactRouter)
app.use('/user/order',orderRoute)
app.use(express.static('uploads'))
adminSeeder()
app.get("/",(req,res)=>{
    res.json({message:"Server is running"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})