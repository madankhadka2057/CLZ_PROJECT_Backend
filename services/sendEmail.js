const nodemailer=require('nodemailer')
const sendEmail=async(options)=>{
    var transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })
    const mailOptions={
        from:"Madan Khadka <khadkadeepak2057@gmail.com>",
        to:"madankhadka2057@gmail.com",
        subject:options.subject,
        html:options.html,
    }
   const response= await transport.sendMail(mailOptions)

}
module.exports=sendEmail