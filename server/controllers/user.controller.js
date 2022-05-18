const modelFile = 'user.model'; //change the modelFile for each project
const User = require(`../models/${modelFile}`) //change Name for each project

// import model and save as a variable

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

// instead of doing module.export mongoose commands here, make a class with methods for less typing

class UserController {

    //admin controller features for getting all users
    getAllUsers = (req, res) => {
        User.find()
            .then(allUsers => {
                res.json({ results: allUsers })
            })
            .catch(err => {
                res.json({ error: err })
            })
    }

    register = (req, res) => {
        User.find({email:req.body.email})
            .then(userWithMatchingEmail=>{
                console.log("Response when finding a user by email: ", userWithMatchingEmail)
                if(userWithMatchingEmail.length===0) {
                    User.create(req.body)
                        .then(user => {
                            const userToken = jwt.sign({
                                id: user._id,
                                firstName: user.firstName,
                            }, process.env.SECRET_KEY);

                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                    httpOnly: true
                                })
                                .json({ msg: "success!", user: user });
                        })
                        .catch(err => res.json(err));
                    }
                else{
                    res.json({errors: {email:{message:"Email is already taken"}}})
                }
            })
            .catch(err => res.json(err));
    }

    login = async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            // email not found in users collection
            // console.log("Logging error code: ",res.sendStatus(400));
            return res.json({error: "User not found who dis"})
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            // password wasn't a match!
            // console.log("Logging error code: ",res.sendStatus(400));
            return res.json({error: "Incorrect password"})

        }

        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id,
            firstName: user.firstName
        }, process.env.SECRET_KEY);

        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    getLoggedInUser = (req, res) =>{
        //use the jwt stored in the cookie to get the id of logged in user to use in axios GET 
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true});
        User.findOne({_id: decodedJWT.payload.id})
            .then(foundUser=>{
                res.json({results: foundUser})
            })
            .catch(err=>{
                res.json(err)
            })
    }




    logout = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}

module.exports = new UserController();