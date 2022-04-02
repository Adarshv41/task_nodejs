const router = require('express').Router();
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

router.post('/', async (req,res) => {
    try {
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password) 
        return res.json({errorMessage:'please provide all details above'});

        if(fullName.length < 3)
        return res.json({errorMessage:'Name should be minimum of 3 characters'});

        if(password.length < 8 || password.length > 20)
        return res.json({errorMessage:'Password character should be between 8 and 20'});

        const existingUSer = await User.findOne({
            email: req.body.email
        });
        if(existingUSer)
        return res.status(400).json({errorMessage: 'User exist.'});

        const passwordHash = await argon2.hash(password);

        const newUser = User.create({
            fullName, email, password: passwordHash
        });

        res.status(200).json({message:'User created successfully'})

    }catch (e) {
        console.log(e);
    }
})
router.post('/login', async (req,res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password)
        return('Please provide all the fields');
        
        const existingUSer = await User.findOne({
            email: req.body.email
        });

        if(!existingUSer)
        return res.status(400).json({errorMessage: 'User not found'});
        
        const verifyPassword = await argon2.verify( existingUSer.password, req.body.password);
        
        if(!verifyPassword){
            res.status(400).json({errorMessage:'Incorrect username or password'});
        }else{
        const token = jwt.sign({
            id: existingUSer._id,
            name: existingUSer.fullName
        },process.env.ACCESS_TOKEN_SECRET);

        return res.json({message:'user logged in', data: token})
    }  

    }catch (e) {
        console.log(e);
    }
});

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader != undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else{
        res.status(400).json({error:'no token'})
    }
}

router.get('/protected', verifyToken ,(req,res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err,data) => {   
        if(err){
            res.sendStatus(403);
        }else {
            res.json({
                message:"user verified",
                data: data
            })
        }
    })
    res.json({message: "token verified"})
});

router.post('/logout', (req,res) => {
    req.token = undefined;
    res.send('logout')
});




module.exports = router;