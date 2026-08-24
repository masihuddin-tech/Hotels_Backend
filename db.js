// // ##### Establishing Connection Between NodeJS Server(ExpressJS) And MongoDB Server #####

const mongoose = require('mongoose');   

// //Define MongoDB connection URL. 
const mongoURL = 'mongodb://localhost:27017/hotels' //Defining URL and creating a new Database named as 'hotels'. 

mongoose.connect(mongoURL)  //Set up MongoDB connection

const db = mongoose.connection; //It stores Mongoose’s current database connection in a variable called 'db' so we can use it later.
 
// //Define event listeners for(connect,error,disconnect)

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:',err);
});

db.on('disconnected', () => {
    console.log('Disconnected to MongoDB server');
});

// //Export the database connection
module.exports = db;  
/*
NOTE:-
 1)The variable which comes under 'module.exports' can only be exported from these file and then can be used in another file.
 2)In the above line, 'module.exports' contains 'db', it means that 'db' can be used in another file by importing this file (db.js).
 3)In our case, we will be using db in another file(server.js), thats why we had used module.exports  
*/