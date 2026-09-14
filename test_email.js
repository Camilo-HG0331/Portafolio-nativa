require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
    } catch (error) {
        console.error("Verification error:", error);
    }
}
test();
