const email = require('emailjs/email')
export default function sendMail (receiver, subject, text, cc = '') {
    const server = email.server.connect({
        user: process.env.Mail_username,
        password: process.env.Mail_password,
        host: process.env.Mail_host,
        tls: true
    });
    
    return server.send({
        text,
        from: "RobertM@Payapp.com",
        to: receiver,
        subject
    }, err => console.log(err))
}