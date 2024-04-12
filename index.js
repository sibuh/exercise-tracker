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
    // const user = new User({username:username});
    // await user.save();
    let user={username:username,_id:objectId};
    users.push(user)

    // const createdUser=await User.findOne({username:username})

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});
app.get("/api/users",async (req,res)=>{
  // let result=[]
  // const users= await User.find();
  // for (let user of users){
  //   result.push({username: 'sibhat',_id:user['_id']})
  // }
  // console.log("result:",result);
  res.json(users);
});

app.post("/api/users/:id/exercises", (req,res)=>{
  const {description,duration,date}=req.body;
  console.log(description,duration,date)
  const userId =req.params;
  const objectId=new mongoose.Types.ObjectId()

  // const user= await User.findOne({_id: userId});
  // console.log("retrieved user:",user);
  // const exercise = new Exercise({
  //     userId: user['_id'],
  //     description: description,
  //     duration: duration,
  //     date:date
  //   });

  //   await exercise.save();
  let username;
  for(let user of users){
    if (user['_id']==userId){
      username=user['username'];
    }
  }
  let exercise={
    _id:objectId,
    username:username,
    userId:userId,
    description:description,
    duration:duration,
    date:date | new Date()
  }

  exercises.push(exercise);

  // const createdEx = await Exercise.findOne({userId: user['_id']});
  // console.log("created exercise:",createdEx)
  res.json(exercise)

})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
