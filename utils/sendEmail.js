import nodemailer from 'nodemailer';

const sendEmail = async function (email, subject, message) {
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: process.env.USER,
        to: email,
        subject,
        html: message,
    };

    return await transporter.sendMail(mailOptions);
};
export default sendEmail;