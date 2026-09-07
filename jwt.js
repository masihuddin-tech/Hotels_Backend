/* JWT (JSON Web Token) is a secure token used to verify a user's identity after they log in, so they don't have to log in again on every request.
JWT token consist of 3 parts,(Header, Payload, Signature) and it will be separated by '.'
JWT Token Ex:- eyJhbGciOiJIUzI1NiJ9 (Header).a2hhbmp3dA (Payload).QCRafCE157a9zouTUXvcJOqOkrKp1Mf99BXQL9J0wrY (Signature).
*/

const jwt = require('jsonwebtoken');

//Funtion to generate JWT Token
const generateToken = (userData) => {
    //Generates a new JWT Token using users, data
    return jwt.sign(userData, process.env.JWT_SECRET_KEY);
}


//Funtion to verify JWT Token
const jwtAuthMiddleware = (req, res, next) => {

    //Extract jwt tokens from header
    const token = req.headers.authorization.split(' ')(1);  //Here, we are separating the 'bearer' keyword and the token.

    /*(headers.authorization.split) - During token authorization, the tokens are defined using a keyword 'bearer' then 'space' then 'actual token'.
     For ex: Bearer jwiosfaodugh.ascadvf.sfvsfsfvbsf.
    Therefore, in this, we are separating the 'bearer' keyword and the token.
    */
    if(!token) return res.status(401).json({error: 'Unauthorized'});    //Executes if token not found

    try{

        //Verify JWT - Its used when we have to check, if a users token is valid or not. It takes 2 parameters (token, secret_key/salt).
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  //jwt.verify() - It takes 2 parameters (token, secret_key/salt).
    
        //Attach token to the request object.
        req.user = decoded  //We send the decoded payload to the server 
        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid Token'});
    }
}

module.exports = {jwtAuthMiddleware, generateToken};