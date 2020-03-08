const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendNotificationEmail = (email, name, orders) => {
  const getTotal = () => {
    let sum = 0;
    for (let i = 0; i < orders.length; i++) {
      sum += Number(orders[i].quantity) * Number(orders[i].price);
    }
    let total = sum.toFixed(2);
    return total;
  };

  const getOrderInfo = () => {
    let template = '';
    for (let i = 0; i < orders.length; i++) {
      template += `[${orders[i].menuTitle} ($ ${orders[i].price})]:      (QTY) ${orders[i].quantity}\n`;
    }
    return template;
  };

  const text = `Customer ${name}, has order below:\n\n${getOrderInfo()}\nTOTAL: ${getTotal()}`;

  sgMail.send({
    to: 'bigstep810@gmail.com',
    from: 'bigstep810@gmail.com',
    subject: 'Food Mall: New Order has been made!',
    text: text
  });
};

const sendConfirmationEmail = (email, name, orders) => {
  const getTotal = () => {
    let sum = 0;
    for (let i = 0; i < orders.length; i++) {
      sum += Number(orders[i].quantity) * Number(orders[i].price);
    }
    let total = sum.toFixed(2);
    return total;
  };

  const getOrderInfo = () => {
    let template = '';
    for (let i = 0; i < orders.length; i++) {
      template += `[${orders[i].menuTitle} ($ ${orders[i].price})]:      (QTY) ${orders[i].quantity}\n`;
    }
    return template;
  };

  const text = `Dear ${name}, please check your order below:\n\n${getOrderInfo()}\nTOTAL: ${getTotal()}`;

  sgMail.send({
    to: email,
    from: 'bigstep810@gmail.com',
    subject: 'Food Mall: Order Confirmation',
    text: text
  });
};

module.exports = {
  sendNotificationEmail,
  sendConfirmationEmail
};
