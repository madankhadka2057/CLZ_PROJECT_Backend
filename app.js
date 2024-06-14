const express=require("express")
const app=express()
app.use(express.json())//convert request data to json formet
app.use(express.urlencoded({extended:true}))
const authRoute=require("./routers/authRoute")
const adminSeeder = require("./adminSeed")
require('dotenv').config();//set environment for .env
const PORT=process.env.PORT||3000


adminSeeder()
app.use("/auth",authRoute)


app.get("/",(req,res)=>{
    res.json({message:"Server is running"})
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})