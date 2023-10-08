const express = require("express"); 
const bparser = require("body-parser"); 
const app = express(); 
const port = 3000;
const path = require("path")
const bmigen = require("bmi-generator"); // bmi package #1
const bmiutil = require("bmi-utils"); // bmi package #2

app.use(bparser.urlencoded({extended: false})); // letting it get values from html form
app.use(express.static(path.join(__dirname))); // letting it see the static css file

app.route('/bmicalculator') // route used for get and post is localhost:3000/bmicalculator
    .get(function(req, res){ 
        res.sendFile(__dirname + '/bmiCalculator.html'); //opening the html page
    })
    .post(function(req, res){
      var height = Number(req.body.height)/100; //gets height by input's name
      var weight = Number(req.body.weight); // gets weight by input's name
      var bmi = bmigen.getBMI(weight, height); // using getBMI to calculate BMI using package bmi-generator
      var status = bmigen.getBMIStausMsg(weight, height) // using getBMIStatusMsg to get the status using bmi-generator
      var idealwF = bmiutil.ideialWeight(height, 'F'); //using idealWeight to calculate the perfect weight using bmi-utils (female)
      var idealwM = bmiutil.ideialWeight(height, 'M'); //using idealWeight to calculate the perfect weight using bmi-utils (male)
      var result = "This is your result: " + bmi +"; Your status is: " + status + "; For females of your height, the ideal weight is in range: "  + idealwF.min + " - " + idealwF.max + "; For males of your height, the ideal weight is in range: "  + idealwM.min + " - " + idealwM.max;
      res.send(result);
      // t sending a message once the button is pressed 
    });
    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})