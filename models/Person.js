// //In this file, we will create a schema(blueprint) of a person

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

// //Password Hashing - 'pre()' - It takes the users password, then adds a salt (some random string), then adds hashing algo, then it generates the hashed password, then the hashed password get stored in DB.
personSchema.pre('save',async function(next){
    const person = this;    //A pointer which points to each person record.

    //NOTE:- We will only generate the hashing when the user will insert a new password or modify an existing password. 
    
    //But, in the below block, the user is neither modifiying nor inserting the password, so the below block will not run(it will do nothing).
    if(!person.isModified('password')) return;
    
    try{
        //Main Password Hashing Logic

        //1)Salt generation
        const salt = await bcrypt.genSalt(10);    //This will generate salt with no. of rounds defined. (Here, we took 10(standard) round. If we took more no of rounds, then more computational task will be required). 
        //2)Hash password generation(users password + generated salt)
        const hashedPassword = await bcrypt.hash(person.password, salt);  //This will generate the hash password by combining users password + salt(generated above).
        person.password = hashedPassword;

    }catch(err){
        return (err);
    }
})


// //Check/Compare the password.
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password); //It will take 2 password; 1st is, users just entered password for logging, 2nd is, for stored DB password. 
        return isMatch;
    }catch(err){
        throw err;
    }
}
/*
######## HOW PASSWORD IS COMPARED/CHECKED? ########(IMP)
Password Checking/Comparing is done through 'compare()' function.

Process:
1)Stored DB password - How users password is stored in DB?
12345 ---> bkadvpwoje1i23bjwf3j (password + Hash)  //(Here, the users password '12345' is converted into 'Hash Password (hash+salt)' and stored in the DB)

2)Generate New Hash Password - Now, user had entered the password(123) for login. 
bkadvpwoje1i23bjwf3j ---> Extract salt      //First, we will extract the salt from the stored 'Hash Password' in DB.
salt + entered password(123) --->  kladdspwoje1i3bjwfj   //Then, we will add 'salt' + 'entered password(123)' for generating a new 'Hash Password'.

3)Compare Hash Passwords
bkadvpwoje1i23bjwf3j == kladdspwoje1i3bjwfj     //Now, we will compare the new Hash Password with stored Hash Password. (If its matches, password is correct. If not, password is incorrect)
*/



// //Create Person Model
const Person = mongoose.model('Person',personSchema);   //Created a model named 'Person'
module.exports = Person;  //We had exported the person model, so that we can use it in another file.
// //NOTE: We will use in server.js file