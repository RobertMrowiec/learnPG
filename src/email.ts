export default function sendMail (receiver, subject, text, cc = '') {
    const email = require('emailjs/email')

    const server = email.server.connect({
        user: process.env.Mail_username,
        password: process.env.Mail_password,
        host: process.env.Mail_host,
        tls: true
    });
    
    server.send({
        text,
        from: "RobertM@Payapp.com",
        to: receiver,
        subject
    }, (err, message) => console.log(err || message))
}