const authRouter = require('express').Router();
const User = require('../models/user');
const argon2 = require('argon2');

authRouter.post('/checkCredentials', async (req, res) => {
    // console.log('request----',req);
    let existingUser = null;
    let validationErrors = null;
    const { email, password } = req.body;
    console.log(email, password);
    let isCheck = false;
    //Methode des async await
    try {
        let userExist = await User.findByEmail(email)
        console.log('userExist', userExist)
        if (!userExist) return res.status(401).send("USER NOT FOUND");
        hashedPassword = userExist.hashedPassword;
        console.log('---->createP   ', password, hashedPassword)
        
        if (await User.verifyPassword(password, hashedPassword)){
            return  res.status(200).send("USER AND PASSWORD CORRECT")
        } else {
            return res.status(401).send("PASSWORD INCORRECT");
        }
    }

    catch (err) {
        console.log(err);
        if (err === 'RECORD_NOT_FOUND')
            res.status(404).send(`User with id ${userId} not found.`);
        if (err === 'DUPLICATE_EMAIL')
            res.status(409).json({ message: 'This email is already used' });
        else if (err === 'INVALID_DATA')
            res.status(424).json({ validationErrors });
        else res.status(500).send('Error updating a user');
    }

    //methode des promesse chainée
    // User.hashPassword(password)
    //     .then(() => {
    //         return User.findByEmail(email)
    //     }).then(userExist => {
    //         console.log('userExistThen', userExist)
    //         return res.status(401).send("USER AND PASSWORD CORRECT");

    //     })
    //     .then(()=>{

    //     })
    //     .catch(err => {res.status(404).send("erreur interne")})   
});

module.exports = authRouter;
