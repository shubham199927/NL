//jshind esversion: 6
const express = require('express');
const bodyParser = require("body-parser");
const https = require('https');
const { subscribe } = require('diagnostics_channel');

  const listId = "b598747a75";

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



//Global FIles
//Sending a html file in response for server request
app.get("/",(req,res)=>{
    
    res.sendFile(`${__dirname}/index.html`)
//end     
});


app.post("/",(req,res)=>{
//reading data from HTML Body
   const name = req.body.name;
   const email = req.body.email;


//creating objects to send in JSON format
 const data = {
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: name,
                LNAME: "",
            }
        }
    ]
  };

 const jsonData =  JSON.stringify(data);
 
 const url = "https://us21.api.mailchimp.com/3.0/lists/" + listId;
 const options = {
   method: 'POST',
   auth: "shubhamshivay:0fb1c6bd0f9e4c8212b1fd46e02cb25a-us21"
 };
const request = https.request(url, options, (response)=>{
    console.log('status code: ' + response.statusCode)

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }
})
request.write(jsonData)
request.end()







});



app.listen(process.env.PORT || 3500,()=>{
    console.log(`Server start , ${process.env.PORT || 3500} `);
})


