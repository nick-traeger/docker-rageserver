const nodemailer = require("nodemailer");


class MailerSingletone {
    constructor() {
        this.createTransport()
    }

    createTransport() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOSTNAME,
            port: parseInt(process.env.SMTP_PORT) || 587,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        
        this.transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            } 
            else {
                console.log('EMAIL SERVER READY!');
            }
        });
    }

    
    getMailAdress() {
        return process.env.SMTP_FROM;
    }

    isEmailValid(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return re.test(email);
    }

    sendMail(message) {
        this.transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(`Error occurred. ${err.message}`);
                return process.exit(1);
            }
        });
    }

}
const mailerSingletone = new MailerSingletone();
module.exports = mailerSingletone;
