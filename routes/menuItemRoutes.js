// ####### In this file, all the API/endpoints related to menuItem will be managed #######

const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// //To Store MenuItems in Database
router.post('/',async (req, res) =>{
  try{
    const data = req.body;
    
    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    console.log("Menu Item Data Stored");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"})
  }
})


// //To fetch MenuItems from the database
router.get('/', async (req, res) =>{
  
  try{
    const data = await MenuItem.find();
    console.log("Menu Item Data Fetched");
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Serveer Error"});
  }
})


// //To fetch data of a taste with specific taste type(sour,spicy,sweet).
router.get('/:taste', async (req, res) => {
  
  try{    
    const taste = req.params.taste; // //Extract the taste from the URL parameter
    if(taste == 'sweet' || taste == 'sour' || taste == 'spicy'){
      const response = await MenuItem.find({taste: taste});
      console.log("Response fetched of "+ taste);
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