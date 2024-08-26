const multer=require('multer')
console.log("123343!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file)
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        console.log("madan"+file)
        cb(null,Date.now()+"-"+file.originalname)
    }
});
module.exports={multer,storage}