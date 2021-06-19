'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

const jwt = require('../services/jwt')


function register(req,res){
    const params = req.body;
    if(params.name && params.email && params.username && params.password){
        var user = new User();
        user.name= params.name;
        user.username = params.username
        User.find({email:params.email}).exec((err,users)=>{
            if(err){
                return res.send({messge:'Email Searching Error'})
            }
            if(users && users.length>=1){
                return res.send({messege:"Same Email Found In The Directory"})
            }
            else{
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    if(err){
                        return res.send({messege:'Hash Making Error'})
                    }
                    user.password = hash
                 
                })
                user.email = params.email
                user.save((err,saveduser)=>{
                    if(err){
                        return res.send({messege:'User Saving Error'})
                    }
                    if(saveduser){
                        return res.send({messege:'Regisatrtion Success',
                                        user:saveduser});
                    }
                })

            }
        })
    }
    else{
        return res.send({messege:'Invalid Data'})
    }
}


function login(req,res){

    const params = req.body;
    if(params.email && params.password){

        var password = params.password;
        var email = params.email;
        User.findOne({email:email}).exec((err,user)=>{
            if(err){
                return res.send({messege:'Email FIndinf Error'})
            }
            if(user){
                bcrypt.compare(password,user.password,(err,hash)=>{
                    if(err){
                        return res.send({messege:'Password Matching Error'})
                    }
                    if(hash){
                        return res.send({
                            messege:'Login Success',
                            token:jwt.createtoken(user),
                            user:user
                        })
                    
                    }
                    else{
                        return res.send({messege:'Wrong Paasword'})
                    }
                })

            }
            else{
                return res.send({messege:"Wrong email address"})
            }
        })
    }
        else{
            return res.send({messege:'Invalid Data'})
        }
    
}




module.exports = {
    login,
    register
}
