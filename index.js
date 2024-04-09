const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyparser=require('body-parser');
const mongoose =require('mongoose');
const User=require("./model/user");
const Exercise=require("./model/exercise");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use(bodyparser.urlencoded({extended:false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users",async(req,res)=>{
  try {
    const { username} = req.body;
    console.log(username);
    const user = new User({username:username});
    await user.save();

    const createdUser=await User.findOne({username:username})

    res.json({ '_id':createdUser['_id'],username:createdUser['username']});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});
app.get("/api/users",async (req,res)=>{
  let result=[]
  const users= await User.find();
  for (let user of users){
    result.push({username: 'sibhat',_id:user['_id']})
  }
  console.log("result:",result);
  res.json(result);
});
app.post("/api/users/:id/exercises",async (req,res)=>{
  const {description,duration,date}=req.body;
  const userId =req.params;
  const exercise = new Exercise({
      userId: userId['id'],
      description: description,
      duration: duration,
      date:date});
    await exercise.save();

  const user= await User({_id:userId})
  console.log('user:',user)

  const createdEx=await Exercise({userId:userId['id']});
  console.log("created exercise:",createdEx);
  res.json(
    {
      username:'sibhat',
      description:description,
      duration: duration,
      date:date,
      _id: createdEx['_id']
    })


  
})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
