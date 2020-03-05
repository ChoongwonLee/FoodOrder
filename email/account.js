const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendNotificationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'bigstep810@gmail.com',
    subject: 'Food Mall: New Order has been made!',
    text: `Customer ${name}, has order`
  });
};

const sendConfirmationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'bigstep810@gmail.com',
    subject: `Food Mall Order to: ${name}`,
    text: `Dear ${name}, Thank you for shopping at Food Mall. Your Order`
  });
};

module.exports = {
  sendNotificationEmail,
  sendConfirmationEmail
};
