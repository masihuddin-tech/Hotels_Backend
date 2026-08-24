// //############## Funtion definitions ##############

// //Learinng of basic JS functions

// //1] Normal Function
// function add(num1, num2){
//     return num1+num2;
// }

// // //2]One line function
// var addition = (n1,n2,n3) => n1+n2+n3;


// var res = add(223,233);
// var result = addition(1,2,4);

// console.log("The addition of 2 number is: "+res);
// console.log("The addition of 3 number is: "+result);

// // //Callback functions - (It means that to run a funtion after a specific task, means callback funtion will execute after specific task)

// function callback(){    //Callback function block
//     console.log("Addtion Done --by Callback funtion")
// }

// const addd = function(no1,no2,callback,khan){
//     var ress = no1+no2;
//     console.log("Result = "+ress);
//     callback();     //Callback function calling - Funtion is initialized before it.
//     khan();   //Another callback funtion calling - Funtion will be initialized later, at the time of argument passing.
// }
// addd(2,3,callback,()=>console.log("Process Completed Successfully!"));   //2 callback funtions are passed(callback() and khan()) - 'callback()' funtion was initialized before but, 'khan()' funtion wasn't created, so we had created at the time of argument passing.




// //############## Creating ExpressJS (NodeJS Server) ##############

const express = require('express');   //Importing express.
const app = express();   //Calling express() and storing in 'app' variable.
const db = require('./db');


const bodyParser = require('body-parser');  //Body parser is used in dealing/handling with the data, it is used to take the data from the body(frontend) and send it to server(backend).
app.use(bodyParser.json());   //Here, body parser will take the data in 'json' format from the frontend and convert it in 'javaScript Object' then, it will send that data to the server. The data will be stored in req.body.


app.get('/', function(req, res){    //This is API. This is the syntax/format for defining/initializing APIs.
  res.send("Welcome to our Restaurant...How may I serve you? Do I give you the best dishes of our Hotel? ")
})

app.get('/Chicken', function(req, res){
  res.send("Sure Sir, Your chiken wings will be ready in 10 mins")
})

app.get('/Idli', function(req, res){
    var customized_idli = {
        name : 'rava idli',
        size : '10cm Diameter',
        is_sambhar : true,
        is_chutney : false

    }
  res.send(customized_idli);
})



const personRoutes = require('./routes/personRoutes'); //Export 'personRouter.js' file.
const menuItemRoutes = require('./routes/menuItemRoutes');  //Export 'menuItemRouter.js' file


app.use('/person',personRoutes); //Use the personRoutes.
app.use('/menuItem',menuItemRoutes); //Use the menuItemRoutes






app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})