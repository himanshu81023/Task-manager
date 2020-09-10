const { connect } = require("mongodb");

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;


const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

mongoClient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
if(error)
   return cosnole.log('error')


const db = client.db(databaseName)
const collection = db.collection('users')
collection.findOne({name:'himanshu'},(error,user)=>{

   if(error)
     return console.log(error)
   console.log(user)
})
// console.log(collection.find({name:'himanshu'})).toArray((error,result)=> {
//    if(error)
//    {
//       console.log(error)
//    }
//    console.log(result)
// })
})

