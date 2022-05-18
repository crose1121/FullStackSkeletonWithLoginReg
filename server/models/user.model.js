// import mongoose
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({ //change NameSchema for each project
    // key names here, with values that are objects with validations like type and minlength
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test (val),
            message: `Please enter a valid email`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },    
    },
    {timestamps: true}
);

UserSchema.virtual('confirm')
    .get( () => this._confirm )
    .set( value => this._confirm = value );


UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Password must match confirm password');
    }
    next();
    });


UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model('user', UserSchema) //change Name, tableName and NameSchema for each project
//mongoose creates a table named ___ using instructions for ____ above

module.exports = User //change Name for each project