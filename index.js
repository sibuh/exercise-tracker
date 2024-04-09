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
    const user = new User({name:username});
    await user.save();

    const createdUser=await User.findOne({name:username})

    res.json({ '_id':createdUser['_id'],name:createdUser['name']});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
