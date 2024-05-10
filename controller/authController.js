const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const register = async (req,res)=>{
    const {email} = req.body;
    const emailAlreadyExsists = await User.findOne({email})
    if(emailAlreadyExsists){
        throw new CustomError.BadRequestError('Email Already Exists')
    }
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
}
const login = async (req,res)=>{
    res.send('login user');
}

const logout = async (req,res)=>{
    res.send('logout user');
}


module.exports = {register, login, logout}
