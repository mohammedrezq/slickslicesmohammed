const nodemailer = require('nodemailer');

const generateOrderEmail = ( { order, total } ) => {
    return `<div class="orderEmailContent">
    <h2>Your Recent order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
        ${order.map(item => `<li>
            <img src="${item.thumbnail}" alt="${item.name}" />
            <div class="orderItemInfo">
            ${item.size} ${item.name} - ${item.price}
            </div>
        </li>`).join('')}
    </ul>
    <p>
        Your total is <strong>${total}</strong> due at pickup.
    </p>
    <style>
    ul {
        list-style: none;
    }

    .orderItemInfo {
        display: block;
        font-size: 18px;
        padding-top: 5px;
    }
    p{
        font-size: 20px;
    }
    </style>
    </div>`
}

// Create a transport for nodemailer

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});



const wait = async (ms = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve ,ms)
    })
}


// Sending an email
exports.handler = async(event, context) =>{
    // await wait(3000);
    const body = JSON.parse(event.body);

    // Check if they have filled out the honeypot
    if(body.mapleSyrup) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'Boop bib bop zzzzzzzsssssst Good bye 54392u#$#$#@'}),
        }
    }

    // console.log(body);
    // Validate the data coming in is correct
    const requiredFields = ['email', 'name', 'order'];

    for(const field of requiredFields) {
        // console.log(`Checking that ${field} is good`)
        if(!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: `Oops, you are missing the ${field}`})
            }
        }
    }

    // Make sure they actually have items in that order

    if(!body.order.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Why have you ordered nothing? Please fill up your order 😋!"
            })
        }
    }


    //  Send an Email
    const info = await transporter.sendMail({
        from:"Slick Slices <slick@example.com>",
        to:`${body.name} <${body.email}>, orders@example.com`,
        subject:"New Pizza Order",
        html: generateOrderEmail({order: body.order, total: body.total})
    });

    return {
        statusCode: 200,
        body: JSON.stringify({message: "Success!"}),
    }
    
}