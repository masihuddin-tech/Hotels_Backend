// //In this file, we will create a schema(blueprint) of a person

const mongoose = require('mongoose');

// //Define Person Schema(Blueprint)
const personSchema = new mongoose.Schema({
    name:{
        type: String,     //Name will be of type String
        required: true    //It is a required field('name')  
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ["chef","waiter","manager"],  //In work, the person has to enter any of the given enum['chef','waiter','manager']
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true     // In email field, each email id should be unique
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }
});


// //Create Person Model
const Person = mongoose.model('Person',personSchema);   //Created a model named 'Person'
module.exports = Person;  //We had exported the person model, so that we can use it in another file.
// //NOTE: We will use in server.js file