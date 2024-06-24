const sendEmail = require("../../services/sendEmail");

exports.contactUs = async (req, res) => {
    const { name, email, number, message } = req.body;
    const mailOptions = {
        email: email,
        subject: `Message from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4CAF50;">Contact Us Message</h2>
                <p><strong>Name:</strong> <span style="color: #1E90FF;">${name}</span></p>
                <p><strong>Email:</strong> <span style="color: #1E90FF;">${email}</span></p>
                <p><strong>Phone Number:</strong> <span style="color: #1E90FF;">${number}</span></p>
                <p><strong>Message:</strong> <span style="color: #1E90FF;">${message}</span></p>
            </div>
        `
    };
    await sendEmail(mailOptions);
    res.status(200).json({
        message: "Message successfully sent"
    });
};
