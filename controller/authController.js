const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {attachCookiesToResponse} = require('../utils')

const register = async (req,res)=>{
    const {name, email,password} = req.body;
    const emailAlreadyExsists = await User.findOne({email})
    if(emailAlreadyExsists){
        throw new CustomError.BadRequestError('Email Already Exists')
    }
    //first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;//if document is empty
    const role = isFirstAccount ? 'admin':'user';
    const user = await User.create({name,email,password,role});
    //generate token from payload 
    const tokenUser = { name:user.name, userId:user._id, role:user.role };
    // already in use in the utils - jwt.js const token = createJWT({ payload:tokenUser })
    attachCookiesToResponse({res, user:tokenUser});
    
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}
const login = async (req,res)=>{
    res.send('login user');
}

const logout = async (req,res)=>{
    res.send('logout user');
}


module.exports = {register, login, logout}
