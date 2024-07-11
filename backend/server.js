import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import validator from 'validator'
import bcrypt from 'bcrypt'; // for password hashing comparison
import jwt from 'jsonwebtoken'; // for token generation
// import http from 'http'
// import branch from './branch'

// const branch = require('./branch')
// const http = require('http')

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

app.post('/userRegister', async (req,res) => {

    const createQuery = 'insert into userProfile (`fullName`,`role`,`contactNumber`,`email`, `password`) values (?)'

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), saltRounds);
    const values = [
        req.body.fullName,
        req.body.role,
        req.body.contactNumber,
        req.body.email,
        hashedPassword
    ]

     // Validate admin Id (assuming it should be a 4-digit number)
     const AIdregex = /^(?:A)?[0-9]{3}$/;     
     if (req.body.role ==='ADMIN' && !AIdregex.test(req.body.adminId)){
         return res.status(400).json({ message: 'Invalid admin Id' });
     }

     // Validate staff Id (assuming it should be a 5-digit number)
     const SIdregex = /^(?:S)?[0-9]{4}$/;     
     if (req.body.role ==='STAFF' && !SIdregex.test(req.body.staffId)){
         return res.status(400).json({ message: 'Invalid staff Id' });
     }

    // Validate email
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate contact number (assuming it should be a 10-digit number)
    const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;    
    if (!CNregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

    // Validate password length
    if (req.body.password.length < 4 || req.body.password.length > 10) {
        return res.status(400).json({ error: 'Password must be between 4 and 10 characters' });
    }

    // Validation function to check if any value is empty
    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(createQuery, [values], (err,data) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(500).json({statusCode:500, statusMessage:'Duplicate entry'})
            }
            return res.status(500).json(err)
        }
        return res.status(201).json({statusCode:201, statusMessage:"Created Successfully"});
    })
})


// Secret key for JWT
const JWT_SECRET = 'supersecretkey';

app.post('/userLogin', async (req,res) => {

    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Ensure email is not empty
    if (!email || email.trim() === '') {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Validate password length
    if (password.length < 4 || password.length > 10) {
        return res.status(400).json({ error: 'Password must be between 4 and 10 characters' });
    }

    // Ensure password is not empty
    if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Password is required' });
    }

    const selectQuery = 'select * from userProfile where email = ?'

    db.query(selectQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'No account found with this email' });
        }

        const user = results[0];

        // Check if password matches
        bcrypt.compare(password.toString(), user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json(err);
            }
            
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Password matched, generate and return a token
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({statusCode:200, message: 'Login successful', token });
        });
    });
})

app.post('/createBranch', (req,res) => {
    const createBranchQuery = 'insert into branch(`branchCode`, `branchName`, `branchAddress`, `city`, `contactNumber`, `zipCode`) values(?)'

    const values = [
        req.body.branchCode,
        req.body.branchName,
        req.body.branchAddress,
        req.body.city,
        req.body.contactNumber,
        req.body.zipCode
    ]

    // Validation function to check if any value is empty
    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate branch code (assuming it should be a 5-digit number)
    // const BCregex = /^(?:Br)?[A-z]{2}?[0-9]{2}$/;  
    const BCregex = /^(?:BR)?[0-9]{3}$/;  
    if (!BCregex.test(req.body.branchCode)){
        return res.status(400).json({ message: 'Invalid branch code' });
    }

    // Validate contact number (assuming it should be a 10-digit number)
    const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;    
    if (!CNregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

    // Validate zip code (assuming it should be a 5-digit number)
    const ZCodeRegex = /^[0-9]{5}$/;
    if (!ZCodeRegex.test(req.body.zipCode)){
        return res.status(400).json({ message: 'Invalid zip code' });
    }

    db.query(createBranchQuery, [values], (err,data) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(500).json({statusCode:500, statusMessage:'Duplicate entry'})
            }
            return res.status(500).json(err)
        }
        return res.status(201).json({statusCode:201, statusMessage:'Created Successfully'})
    })
})


app.get('/viewBranch', (req,res) => {
    const viewBranchQuery = 'select * from branch'

    db.query(viewBranchQuery, (err,data) => {
        if(err) {
            return res.json(err)
        } 
        return res.send(data)
    })
})

app.delete('/deleteBranch/:branchCode', (req,res) => {
    const deleteQuery = 'delete from branch where branchCode=?'

    const values = [
        req.params.branchCode
    ]

    db.query(deleteQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }
        return res.send('Deleted Successfully')
    })
})

app.put('/updateBranch/:branchCode', (req,res) => {
    const updateQuery = 'update branch set branchName=?, branchAddress=?, city=?, contactNumber=?, zipCode=? where branchCode=?'

    const values = [
        req.body.branchName,
        req.body.branchAddress,
        req.body.city,
        req.body.contactNumber,
        req.body.zipCode,
        req.params.branchCode
    ]

    // Validation function to check if any value is empty
    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate contact number (assuming it should be a 10-digit number)
    const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;    
    if (!CNregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

    // Validate zip code (assuming it should be a 5-digit number)
    const ZCodeRegex = /^[0-9]{5}$/;
    if (!ZCodeRegex.test(req.body.zipCode)){
        return res.status(400).json({ message: 'Invalid zip code' });
    }

    db.query(updateQuery, values, (err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(201).send({statusCode:201, statusMessage:'Updated Successfully'})
    })
})

app.post('/createParcel', (req,res) => {
    const createParcelQuery = 'insert into parcel(referenceNumber, senderName, senderDate, recipientName, recipientDate, status) values(?)'

    const values = [
        req.body.referenceNumber,
        req.body.senderName,
        req.body.senderDate,
        req.body.recipientName,
        req.body.recipientDate,
        req.body.status
    ]

    if(!values.every(value => value !== undefined && value !== '')) {
        return res.status(400).json({error: 'All fields are required'})
    }

    // Validate zip code (assuming it should be a 5-digit number)
    const RNRegex = /^(?:P)?[0-9]{4}$/; 
    if (!RNRegex.test(req.body.referenceNumber)){
        return res.status(400).json({ message: 'Invalid reference Number' });
    }

    const isValidName = (senderName,recipientName) => {
        const regex = /^[A-Za-z\s]{1,50}$/; // Example: letters and spaces, max length 50
        return regex.test(req.body.senderName, req.body.recipientName);
    };

    if(!isValidName) {
        return res.status(400).json({error: 'Invalid name'})
    }

    const Nameregex = /^[A-Za-z\s]{1,50}$/; // Example: letters and spaces, max length 50

    if(!Nameregex.test(req.body.senderName)) {
        return res.status(400).json({error: 'Invalid sender name'})
    }

    if(!Nameregex.test(req.body.recipientName)) {
        return res.status(400).json({error: 'Invalid recipient name'})
    }
    
    // const isValidDate = (senderDate, recipientDate) => {
    //     const regex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD format
    //     return regex.test(senderDate, recipientDate) && !isNaN(new Date(senderDate, recipientDate).getTime());
    // };

    // if(!isValidDate) {
    //     return res.status(400).json({error: 'Invalid date'})
    // }

    const Dateregex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD format

    if(!Dateregex.test(req.body.senderDate) && !isNaN(new Date(senderDate).getTime())) {
        return res.status(400).json({error: 'Invalid sender date'})
    }

    if(!Dateregex.test(req.body.recipientDate) && !isNaN(new Date(recipientDate).getTime())) {
        return res.status(400).json({error: 'Invalid recipient date'})
    }

    const validStatuses = ['Item accepted by Courier', 'Collected', 'Shipped', 'In-Transit', 'Delivered']; // Example statuses

    if(!validStatuses.includes(req.body.status)){
        return res.status(400).json({error: 'Invalid status'})
    }

    db.query(createParcelQuery, [values], (err,data) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(500).json({statusCode:500, statusMessage:'Duplicate entry'})
            }            
            return res.status(500).json(err)
        }
        return res.status(201).json({statusCode:201, statusMessage: 'Created Successfully'})
    })
})

app.listen(6431, () => {
    console.log("Running")
})