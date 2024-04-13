const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyparser=require('body-parser');
const mongoose = require('mongoose');

// Generate a new ObjectId

// const Exercise=require("./model/exercise");

// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use(bodyparser.urlencoded({extended:false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let users=[];
let exercises=[];
app.post("/api/users",async(req,res)=>{
  const objectId=new mongoose.Types.ObjectId()
  try {
    const { username} = req.body;
    console.log(username);
    let user={username:username,_id:objectId};
    users.push(user)

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});
app.get("/api/users",async (req,res)=>{
  res.json(users);
});

app.post("/api/users/:_id/exercises", (req,res)=>{
  const {description,duration,date}=req.body;
  console.log(description,duration,date)
  const param =req.params;
  console.log("param:",param)
  let username;
  for(let user of users){
    if (user['_id']==param['_id']){
      username=user['username'];
    }
  }
  let exercise={
    username:username.toString(),
    description:description.toString(),
    duration:parseInt(duration),
    date:new Date().toDateString(),
    _id:param['_id'],
  }
  console.log(exercise);
  exercises.push(exercise);
  res.json(exercise)

})
app.get('/api/users/:_id/logs',(req,res)=>{
  let log=[];
  const params =req.params;
  for (let ex of exercises){
    if (ex['_id']==params['_id']){
      log.push({
        description: ex['description'].toString(),
        duration: parseInt(ex['duration']),
        date: new Date().toDateString()
    })

    }

  }
  console.log("logs:",log)
  res.json({
    username:params['_id'],
    count:log.length,
    log:log
  })

});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
