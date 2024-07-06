import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import validator from 'validator'
import bcrypt from 'bcrypt'; // for password hashing comparison
import jwt from 'jsonwebtoken'; // for token generation

// Database connection setup (adjust to your configuration)
const db = mysql.createConnection({
    host:'localhost',
    database:'Courier-Service-Project',
    user:'root',
    password:''
})

const app = express()

app.use(express.json()) // for parsing application/json
app.use(cors())

app.post('/user',(req,res) => {

    const createQuery = 'insert into userProfile (`fullName`,`role`,`contactNumber`,`email`, `password`) values (?)'
    const values = [
        req.body.fullName,
        req.body.role,
        req.body.contactNumber,
        req.body.email,
        req.body.password
    ]

    // Validate email
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // // Validate contact number (assuming it should be a 10-digit number)
    // if (!validator.isMobilePhone(req.body.contactNumber, 'any', { strictMode: true })) {
    //     return res.status(400).json({ message: 'Invalid contact number' });
    // }

    // Validation function to check if any value is empty
    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(createQuery, [values], (err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(201).json({statusCode:201, statusMessage:"Created Successfully"});
    })
})




// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

app.post('/userLogin', (req,res) => {

    const createQuery = 'select * from userProfile where id = ?'

    const values = [
        req.body.email,
        req.body.password
    ]

    // Validate email
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Ensure password is not empty
    if (!req.body.password || req.body.password.trim() === '') {
        return res.status(400).json({ message: 'Password is required' });
    }

    // db.query(createQuery, values, (err,data) => {
    //     if(err) {
    //         return res.status(500).json(err)
    //     }
    //     return res.json({ message: 'Login successful', token: 'your_generated_token_here' })
    // })

    db.query(createQuery, values, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Check if password matches
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Password matched, generate and return a token
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', token });
        });
    });
})

app.listen(6431, () => {
    console.log("Running")
})