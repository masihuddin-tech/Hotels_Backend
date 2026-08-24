// ####### In this file, all the API/endpoints related to person will be managed #######

const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// //The following API is to store the persons' data in the database(Insert/Insertion).
router.post('/',async (req, res) =>{
  try{
    const data = req.body;   //The data is present in req.body then we will store it in 'data' variable.

    //Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    //Save the newPerson data to the database.
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"})
  }
})

// //Following API is used to read/display the person data from the database(Read/Retrieve).
router.get('/',async (req, res) =>{

  try{
    const data = await Person.find();
    console.log("Person Data Fetched");
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
})

// //To fetch data of a person with specific work type(waiter,manager,chef).
router.get('/:workType', async (req, res) => {
  
  try{    
    const workType = req.params.workType; // //Extract the workType from the URL parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log("Response fetched of "+ workType);
      res.status(200).json(response);
    }
    else{
      res.status(400).json({error: "Invalid work type"})
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }     
})

module.exports = router;
