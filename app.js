const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static(__dirname));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.first
  const lastName = req.body.last
  const email = req.body.email

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/5a6142955f";
  const options = {
    method: "POST",
    auth: "Eclipchiks:98f5b48bd5c039e066469d88ae30abaf-us9"
  }

  const request = https.request(url, options, function(responce) {
    responce.on("data", function(data) {
      const test = console.log(responce.statusCode);

      console.log(JSON.parse(data));


      if(responce.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else{
        res.sendFile(__dirname + "/failure.html")
      }

    })
  })



  request.write(jsonData);
  request.end();

});


app.post("/failure", function(req, res){
  res.redirect("/")
})



app.listen(process.env.PORT, function() {
  console.log("Server is started on port 3000");
});


//API Key
//98f5b48bd5c039e066469d88ae30abaf-us9

//List ID
//5a6142955f
