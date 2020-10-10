const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users.js')
const taskRouter = require('./routers/tasks.js')
const { JsonWebTokenError } = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 2000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })



// uploading files 
const multer = require('multer');
const upload = multer({
    dest: 'images'
})
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }


// myFunction()
// const pet = {
//     name: 'hia'
// }

// const p  = pet;
// p.name = "hero"
// console.log(pet.name)
// p.toJSON = function() {
//     user = this;
//     delete user.name;
//     return user
// }
// const t = JSON.stringify(p)
// console.log(t);

// console.log(pet.name)
const task = require('./models/task')
const User = require('./models/user')
// const main = async ()=>{
//     const t = await task.findById('5f69a447d97af62686cc4834')
//     await t.populate('owner').execPopulate()
//     console.log(t)
//     console.log(t.owner)
   
// }

const main  = async()=>{
    const  t = await  User .findById('5f69ad79bdbe772ccd6c6d49')
    await t.populate('tasks').execPopulate()
    console.log(t.tasks)
}
 main()