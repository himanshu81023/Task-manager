const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks',auth, async (req, res) => {
    const task = new Task({...req.body,
     owner:req.user._id})

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks',auth,async (req, res) => {
    const tasks={};
    try {
      //const tasks = await Task.find({owner: req.user._id})
      //above function is also same as that of down function
      const t = (req.query.completed === "true")

     //console.log("hi",req.query.completed)
      
      await req.user.populate({path:'tasks',
                         match:{completed: t},
                         options:{
                             limit:parseInt(req.query.limit),
                             skip:parseInt(req.query.skip),
                             sort:{
                                createdAt:-1
                             }
                         }
                       
                        }).execPopulate()

      res.status(200).send(req.user.tasks)
    }catch (e) {
        res.status(500).send("error due to populate")
    }
})

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        
        //const task = await Task.findById(_id)
       // this we done only by findone operation-- 
       const  task = await Task.findOne({_id,owner:req.user._id})
    


        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        //const task = await Task.findById(req.params.id)
        const  task = await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send("task not found")
        }

        //console.log(task)
        updates.forEach((update)=> task.update =  req.body.update )
        await task.save()
        
     
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth , async (req, res) => {
    try {
        const _id = req.params.id

        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id,owner:req.user._id})
    

        if (!task) {
            res.status(404).send("cause this happens")
        }

        res.send(task)
    } catch (e) {
        res.status(500).send("coming  out of this")
    }
})

module.exports = router