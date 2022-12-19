const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/fc333702b2";
    const options = {
        method: "POST",
        auth: "eman:***************-us21"
    };


    const request = https.request(url, options, function(response){
        response.on("data", function(data){

            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/error.html");
            }

            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT, function(){
    console.log("Server running on port 300");
});


