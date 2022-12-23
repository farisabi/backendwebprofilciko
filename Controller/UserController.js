require('dotenv').config
const User = require('../Models/UserModel');
const b = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.DaftarUser = async (req,res) => {
    const { username, email, password} = req.body

    const emailUser = await User.findOne({email : email})
    const usernameuser = await User.findOne({username : username})

    if(usernameuser){
        return res.status(404).json({
            status : false,
            message : 'username sudah terdaftar'
        })
    }

    if(emailUser){
        return res.status(404).json({
            status : false,
            message : 'email sudah terdaftar'
        })
    }

    
    
    const hash = await b.hash(password, 10)
    const user = new User({
        username: username,
        email: email,
        password: hash
    })

    user.save()

    return res.status(201).json({
        status : true,
        message: 'User Berhasil Ditambahkan'
    })
}

exports.LoginUser = async (req, res) => {
    const { username, password } = req.body

    const userName = await User.findOne({username: username})
    if(userName){

        const passwordUser = await b.compare(password, userName.password)
        if(passwordUser){

            const data={
                id: userName._id
            }

            const token = await jwt.sign(data, process.env.key)

            return res.status(200).json({
                message : 'Berhasil',
                token : token
            })
        } else {
            return res.status(404).json({
                message : 'Username atau Password Salah'
            })
        } 
    } else {
        return res.status(404).json({
            message : 'Username atau Password Salah'
        })
    }
}

exports.getUser = async (req,res) => {
    const user = await User.findOne({_id : req.id})
    return res.status(200).json({
        message : 'Berhasil di panggil',
        data : user
    })
}