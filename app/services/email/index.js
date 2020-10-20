'use strict'
const nodemailer = require('nodemailer')
let transporter

const getTransporter = async () => {
    if (!transporter) {
        const testAccount = await nodemailer.createTestAccount()
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        })
    }
    return transporter
}
const sendEmail = async ({ subject = '', to, html }) => {
    const trans = await getTransporter()
    const info = await trans.sendMail({
        from: '"Overgaming" <info@overgaming.com>',
        to,
        subject,
        html
    })
    console.info('Message sent: %s', info.messageId)
    console.info('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

module.exports = {
    sendEmail
}
