const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth.js')
const  {sendExitingEmail } = require('../emails/account.js')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    sendWelcomeEmail(user.email,user.name)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

 router.post('/users/logout', auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return (token.token !== req.token)
       })
        await req.user.save()
        res.send("You are logged out")
    }catch(e){
        req.status(500).send("please authenticate first")
    }
 })

 router.post('/users/logoutall',auth, async(req,res)=>{
      try{
          req.user.tokens = []
          await req.user.save()
          res.status(200).send("logged out of all devices including this")
      }catch(e){
          res.status(500).send("please authenticate first")
      }
 })

const multer = require('multer');
const { sendWelcomeEmail } = require('../emails/account')
const upload = multer({
    dest: 'avatars'
})

router.post('/users/me/avatar',upload.single('avatar'),(req,res)=>{
    res.send()
})
router.get('/users/me',auth, async (req, res) => {
    //console.log(req.user)
    res.send(req.user)

})

// now we dont needed them as we are not going to provide 
// any id to users


// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = req.user

        updates.forEach((update) => user.update = req.body.update)
        await user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }  cua

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req, res) => {
    try {
        console.log("hii hwo are you")
        sendExitingEmail(req.user.email,req.user.name);
        console.log('this is me ')
     
        const t = await req.user.remove();
   
        res.status(200).send(t)
        
    } catch (e) {
        res.status(500).send()


    }
})

module.exports = router