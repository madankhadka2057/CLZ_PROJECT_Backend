const express=require("express")
const app=express()
app.use(express.json())//convert request data to json formet
app.use(express.urlencoded({extended:true}))
const adminSeeder = require("./adminSeed")
const isAuthenticated = require("./middleware/isAuthenticated")
const checkRole = require("./middleware/checkRole")
require('dotenv').config();//set environment for .env
const PORT=process.env.PORT||3000

const authRoute=require("./routers/auth/authRoute")
const productRoute=require('./routers/admin/productRoute')
adminSeeder()
app.use("/auth",authRoute)
app.use('/admin/',productRoute)
app.use(express.static('uploads'))

app.get("/",(req,res)=>{
    res.json({message:"Server is running"})
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})