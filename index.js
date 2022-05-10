//jshint version: 6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");

});
app.post("/", function(req,res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        },
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = 'https://us14.api.mailchimp.com/3.0/lists/ec77fbdbc6';
  const options = {
    method:'POST',
    auth:'priyanshu:cc95d1c21d2afdffc49b085389a3d224-us14'
  };

  const request=https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(jsonData);
  request.end();




});

app.listen(3000,function(){
  console.log("The server is running on port 3000")
});

//ec77fbdbc6
//cc95d1c21d2afdffc49b085389a3d224-us14
