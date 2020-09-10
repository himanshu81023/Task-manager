const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useNewUrlParser:true,useCreateIndex:true})

// const User = mongoose.model('User',{
//     name:{
//         type: String
//     },
//     age:{
//          type : Number
//     }
// })

// const me = new User({name:"ankit",age:"19"})
// //using methods on our instances;
// me.save().then((result)=>{
//     console.log("success!")
//     console.log(result)
// }).catch((error)=>{
//     console.log("error", error);
// })
// while going through this _v is version which is additionaly created my mongoose
const User2 = mongoose.model('User2',{
    name:{
        type:String
    },
    comp:{
        type:Boolean

    }
})
const  db = new User2({name: 'himanshu',comp:true})
db.save().then(()=>{
    console.log("hello"+db)
}).catch((error)=>{
     console.log("error!")
})