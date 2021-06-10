const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          process.env.API_KEY
      }
    })
  );
const authCtrl = {
    signup:  async (req, res) => {
        try {
            const { name,username,password,email,gender } = req.body;
            let newUsername = username.toLowerCase().replace(/ /g, '')

            const user_name = await Users.findOne({username: newUsername})
            if(user_name) return res.status(400).json({msg:"This username already exists"})

            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({msg:"This email already exists"})

            if(password.length < 6)
            return res.status(400).json({msg:"Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password,12)

            const newUser = new Users({
                name,username:newUsername,email,password:passwordHash,gender
            })
    
            const access_token = createAccessToken({id: newUser.id})
            const refresh_token = createRefreshToken({id: newUser.id})

            res.cookie('refreshtoken', refresh_token,{
                httpOnly: true,
                path:'/refresh_token',
                maxAge: 30*24*60*60*1000
            })

            await newUser.save()
            await transporter.sendMail({
            to: email,
            from: 'racser2001@gmail.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up on Vibez!</h1>'
            });
            
            res.json({
                msg:"Account Successfully created!",
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    login:  async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({email})
            .populate("followers following", "avatar username name followers following")
            
            if(!user) return res.status(400).json({msg:"This email does not exist."})
            
            const match = await bcrypt.compare(password, user.password)
            if(!match) return res.status(400).json({msg:"This password is incorrect."})

            const access_token = createAccessToken({id: user.id})
            const refresh_token = createRefreshToken({id: user.id})

            res.cookie('refreshtoken', refresh_token,{
                httpOnly: true,
                path:'/refresh_token',
                maxAge: 30*24*60*60*1000
            })

            res.json({
                msg:"Login Success!",
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    logout:  async (req, res) => {
        try {
            res.clearCookie('refreshtoken',{path: '/refresh_token'})
            return res.json({msg:'Logged out!'})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg:"Please Login Now!"})
            jwt.verify(rf_token, process.env.Refresh_Token_Secret,async (err, result) => {
                if(err) return res.status(400).json({msg: 'Please Login Now!'})

                const user = await Users.findById(result.id).select("-password")
                .populate('followers following','avatar username name followers following')

                if(!user) return res.status(400).json({msg: 'This does not exist.'})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user         
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}


const createAccessToken = (payload) => {
    return jwt.sign(payload,process.env.Access_Token_Secret,{expiresIn:'1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload,process.env.Refresh_Token_Secret,{expiresIn:'30d'})
}

module.exports = authCtrl;