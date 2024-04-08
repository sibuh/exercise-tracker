const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users",(req,res)=>{
  const {username}= req.body;
  


});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
