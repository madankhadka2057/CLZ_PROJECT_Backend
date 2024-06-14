

const { users } = require("./model");
const bcrypt=require("bcryptjs")


async function adminSeeder(){
    const data={
        email:"madankhadka@gmail.com",
        role:"admin"
    }
const isExist =await users.findOne({
    where:{
        email:data.email,
        role:data.role
    }
})
if(!isExist){
    await users.create({
        userName:"madan khadka",
        email:"madankhadka@gmail.com",
        phoneNumber:9867365986,
        password:bcrypt.hashSync("admin",10),
        role:"admin"
    })
    console.log("Admin Seeded Sucessfully")
}else{

    console.log("Admin already exist")
} 
}
module.exports=adminSeeder