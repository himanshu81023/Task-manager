const sgmail = require("@sendgrid/mail")
const sendgridApi = process.env.API_KEY 

sgmail.setApiKey(sendgridApi)

const sendWelcomeEmail = (email,name)=>{
    // console.log(email)
    // console.log(name)
sgmail.send({ 
    to:email,
    from:'himanshu81023.hm@gmail.com',
    subject:"Welcome Here",
    text:`HI, ${name} we are so happy to see you`
})
}
const sendExitingEmail = (email,name)=>{
    console.log(email)
    console.log(name)
    sgmail.send({ 
        to:email,
        from:'himanshu81023.hm@gmail.com',
        subject:"first mail",
        text:`HI, ${name} we are so sad we dont fill up your need`
})
}

module.exports = {
    sendWelcomeEmail,
    sendExitingEmail
}