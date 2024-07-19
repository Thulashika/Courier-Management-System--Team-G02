import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import validator from 'validator'
import bcrypt from 'bcrypt'; // for password hashing comparison
import jwt from 'jsonwebtoken'; // for token generation
import path from 'path'
import nodemailer from 'nodemailer'
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

app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies

// Set the view engine to EJS
app.set('views', path.join('../frontend/login', 'views'));
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

const getStaffIdByStaffId = (staffId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM staff WHERE staffId = ?';
      db.query(query, [staffId], (err, data) => {
        if (err) {
          reject(err);
        } else if (data.length === 0) {
          resolve(new Error('Staff not found'));
        } else {
          resolve(data[0].id);
        }
      });
    });
  };

app.post('/userRegister', async (req, res) => {
    const createQuery = 'INSERT INTO userProfile (`fullName`, `role`, `staffId`, `contactNumber`, `email`, `password`) VALUES (?)';

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), saltRounds);
    let staffId = null; // Initialize staffId as null by default

    // Validate staff Id (assuming it should be a 5-digit number)
    const SIdregex = /^(?:Y)?[AMSD][0-9]{3}$/;     
    if (req.body.role === 'STAFF' && !SIdregex.test(req.body.staffId)) {
        return res.status(400).json({ message: 'Invalid staff Id' });
    } else if (req.body.role === 'STAFF') {
        try {
            staffId = await getStaffIdByStaffId(req.body.staffId);
        } catch (error) {
            return res.status(404).json({ error: 'Staff not found' });
        }
    }

    // Validate email
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate contact number (assuming it should be a 10-digit number)
    const CNMPregex = /^(?:0)?[7][01245678][0-9]{7}$/;  
    if (!CNMPregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

    // Validate password length
    if (req.body.password.length < 4 || req.body.password.length > 10) {
        return res.status(400).json({ error: 'Password must be between 4 and 10 characters' });
    }

    // Construct values array for insertion
    const values = [
        req.body.fullName,
        req.body.role,
        staffId,
        req.body.contactNumber,
        req.body.email,
        hashedPassword
    ];

    // Validation function to check if any value is empty
    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(createQuery, [values], (err, data) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(500).json({ statusCode: 500, statusMessage: 'Duplicate entry' });
            }
            return res.status(500).json(err);
        }
        return res.status(201).json({ statusCode: 201, statusMessage: 'Created Successfully' });
    });
});


// Secret key for JWT
// const JWT_SECRET = 'supersecretkey';
const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe"

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

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if email exists in database
    const selectQuery = 'SELECT * FROM userProfile WHERE email = ? limit 1';
    db.query(selectQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        // Generate a token with a short expiry (e.g., 1 hour)
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        // Send email with password reset link
        try {
            await sendPasswordResetEmail(email, token);
            // db.query(
            //     `insert into password-reset(email, token) values(${db.escape(results[0].email)}, '${token}')`
            // )

             // Insert token into the password_reset table
             const insertQuery = 'INSERT INTO `password-reset` (email, token) VALUES (?, ?)';
             db.query(insertQuery, [email, token], (err) => {
                 if (err) {
                     console.error('Error inserting token into database:', err);
                     return res.status(500).json({ message: 'Internal server error' });
                 }
                 return res.status(200).json({ message: 'Password reset email sent' });
             });

            // return res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending password reset email' });
        }

        // db.query(
        //     `insert into password-reset(email, token) values(${db.escape(results[0].email)}, '${token}')`
        // )
    });
})

// Helper function to send password reset email
async function sendPasswordResetEmail(email, token) {
    try{
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'http://localhost:6431/reset-password',
            port: 587,
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            service: 'gmail',
            auth: {
                user: 'lasibala24@gmail.com',
                pass: 'Family2403',
            },
        });

        // Email content
        const mailOptions = {
            from: 'lasibala24@gmail.com',
            to: email,
            subject: 'Password Reset Instructions',
            html: `
                <p>You requested a password reset for your account.</p>
                <p>Click <a href="http://localhost:6431/reset-password/${token}">here</a> to reset your password.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        };

        // Send email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Mail sent successfully: ', info.response);
            }
        })

        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Error sending password reset email');
    }
}

// Route to handle password reset form rendering
app.get('/reset-password', (req,res) => {
    try {
        const token = req.body.token  // Use req.query to get the token from the URL

        if(!token) {
            return res.json('404')
        }

        db.query(`select * from password-reset where token = ? limit 1`, [token], (err, results) => {
            if(err) {
                console.log("first:",err)
                return res.status(500).json('Internal Server Error');
            }

            if(results.length > 0) {

                const email = results[0].email;
                db.query(`select * from userprofile where email = ? limit 1`, [email], (err, result) => {
                    if(err) {
                        console.log("sec:",err)
                        return res.status(500).json('Internal Server Error')
                    }
                    
                    return res.json('reset-password', {user: result[0]})
                })

            } else {
                return res.json('404')
            }
        })

    } catch (error) {
        console.log("3:",error.message)
        return res.status(500).json('Internal Server Error')
    }
})

// Route to handle password reset form submission
app.post('/reset-password', (req, res) => {
    const { password, confirmPassword, token } = req.body;

    if(password !== confirmPassword) {
        return res.json({statusCode: 500, statusMessage:('reset-password', {error_message: 'Password not match'})});
        // return res.json('Password not  match')
    }

    // Hash the new password (implement your hashing function)
    const hashedPassword = hashPassword(password);

    // Find the user by token and update their password
    db.query('SELECT * FROM `password_reset` WHERE token = ? LIMIT 1', [token], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json('Internal Server Error');
        }

        if (results.length > 0) {
            const email = results[0].email;
            db.query('UPDATE `userProfile` SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json('Internal Server Error');
                }

                return res.json('reset-password-success'); // Create this view to show a success message
            });
        } else {
            return res.json('404');
        }
    });
})

// Function to hash passwords (implement this function as per your requirements)
function hashPassword(password) {
    // Implement password hashing (e.g., using bcrypt)
    return password; // Replace with hashed password
}

app.post('/branch', (req,res) => {
    const createQuery = 'insert into branch(`branchCode`, `branchName`, `branchAddress`, `city`, `contactNumber`, `zipCode`) values(?)'

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

    db.query(createQuery, [values], (err,data) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(500).json({statusCode:500, statusMessage:'Duplicate entry'})
            }
            return res.status(500).json(err)
        }
        return res.status(201).json({statusCode:201, statusMessage:'Created Successfully'})
    })
})


app.get('/branch', (req,res) => {
    const getAllQuery = 'select * from branch'

    db.query(getAllQuery, (err,data) => {
        if(err) {
            return res.json(err)
        } 
        return res.send(data)
    })
})

app.get('/branch/:id', (req,res) => {
    const getByIdQuery = 'select * from branch where id=?'

    const values = [
        req.params.id
    ]

    db.query(getByIdQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }
        return res.send(data[0])
    })
})

app.delete('/branch/:id', (req,res) => {
    const deleteQuery = 'delete from branch where id=?'

    const values = [
        req.params.id
    ]

    db.query(deleteQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }
        return res.send('Deleted Successfully')
    })
})

app.put('/branch/:id', (req,res) => {
    const updateQuery = 'update branch set branchName=?, branchAddress=?, city=?, contactNumber=?, zipCode=? where id=?'

    const values = [
        req.body.branchName,
        req.body.branchAddress,
        req.body.city,
        req.body.contactNumber,
        req.body.zipCode,
        req.params.id
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

//     // const Nameregex = /^[A-Za-z\s]{1,50}$/; // Example: letters and spaces, max length 50
//     // if(!Nameregex.test(req.body.senderDetails)) {
//     //     return res.status(400).json({error: 'Invalid sender name'})
//     // }

//     // if(!Nameregex.test(req.body.recipientDetails)) {
//     //     return res.status(400).json({error: 'Invalid recipient name'})
//     // }
    
//     // const isValidDate = (senderDate, recipientDate) => {
//     //     const regex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD format
//     //     return regex.test(senderDate, recipientDate) && !isNaN(new Date(senderDate, recipientDate).getTime());
//     // };

//     // if(!isValidDate) {
//     //     return res.status(400).json({error: 'Invalid date'})
//     // }

//     const Dateregex = /^\d{2}-\d{2}-\d{4}$/; // Example: YYYY-MM-DD format

//     // if(!Dateregex.test(req.body.senderDate) && !isNaN(new Date(senderDate).getTime())) {
//     //     return res.status(400).json({error: 'Invalid sender date'})
//     // }

//     // if(!Dateregex.test(req.body.recipientDate) && !isNaN(new Date(recipientDate).getTime())) {
//     //     return res.status(400).json({error: 'Invalid recipient date'})
//     // }

//     // if(!Dateregex.test(req.body.senderDetails)) {
//     //     return res.status(400).json({error: 'Invalid sender date'})
//     // }

app.post('/parcel', (req, res) => {
    const createQuery = 'insert into parcel(`referenceNumber`, `senderDetails`, `recipientDetails`, `parcelDetails`, `status`) VALUES(?,?,?,?, ?)';

    const { senderDetails, recipientDetails, parcelDetails } = req.body;

    if (!senderDetails || !recipientDetails || !parcelDetails) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Serialize the objects to JSON
    const senderDetailsJSON = JSON.stringify(senderDetails);
    const recipientDetailsJSON = JSON.stringify(recipientDetails);

    console.log(typeof(JSON.parse(senderDetailsJSON)))

     // Check if parcelDetails is an array
    if (!Array.isArray(parcelDetails)) {
        return res.status(400).json({ error: 'parcelDetails must be an array' });
    }

    parcelDetails.forEach(parcel => {
        const { referenceNumber, weight, deliveryCharge, totalAmount, dueAmount, status } = parcel;

        if (!referenceNumber || !weight || !deliveryCharge || !totalAmount || !dueAmount || !status) {
            return res.status(400).json({ error: 'All parcel details fields are required' });
        }

        const validStatuses = ['ACCEPTED', 'COLLECTED', 'SHIPPED', 'IN-TRANSIT', 'DELIVERED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Validate reference number (assuming it should be a 5-digit number)
        const RNRegex = /^(?:P)?[0-9]{4}$/;
        if (!RNRegex.test(referenceNumber)) {
            return res.status(400).json({ message: 'Invalid reference Number' });
        }

        // Combine parcel details into a single JSON object
        const parcelDetailsJSON = JSON.stringify({ weight, deliveryCharge, totalAmount, dueAmount });

        db.query(createQuery, [referenceNumber, senderDetailsJSON, recipientDetailsJSON, parcelDetailsJSON, status], (err, data) => {
            if (err) {
                if (err.errno === 1062) {
                    return res.status(500).json({ statusCode: 500, statusMessage: 'Duplicate entry' });
                }
                return res.status(500).json(err);
            }
            return res.status(201).json({ statusCode: 201, statusMessage: 'Created Successfully' });
        });
    });
});

app.get('/parcel', (req,res) => {
    const getAllQuery = 'select * from parcel limit ?, ?';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    // Prepare the base query
    let query = 'SELECT * FROM parcels';
    let queryParams = [];

    // Add the search filter if there is a search term
    if (search) {
        query += ` WHERE referenceNumber LIKE ? OR 
                   senderFirstName LIKE ? OR 
                   senderLastName LIKE ? OR 
                   senderDate LIKE ? OR 
                   recipientFirstName LIKE ? OR 
                   recipientLastName LIKE ? OR 
                   recipientDate LIKE ? OR 
                   status LIKE ?`;
        const searchPattern = `%${search}%`;
        queryParams = Array(8).fill(searchPattern);
    }

    // Add pagination
    query += ' LIMIT ?, ?';
    queryParams.push(offset, limit);

    db.query(getAllQuery, [offset, limit], (err,data) => {
        if(err) {
            return res.json(err)
        } 
        return res.send(data)
    })
})

// Endpoint to get total number of parcels (for pagination metadata)
app.get('/parcel/count', (req, res) => {

    const query = 'select count(*) as count from parcel';

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results[0]);
    });
});

app.get('/parcel/:id', (req,res) => {
    const getByIdQuery = 'select * from parcel where id=?'

    const values = [
        req.params.id
    ]

    db.query(getByIdQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }

        data = data.map(parcel => ({
            referenceNumber: parcel.referenceNumber,
            senderDetails: JSON.parse(parcel.senderDetails),
            recipientDetails: JSON.parse(parcel.recipientDetails),
            parcelDetails: JSON.parse(parcel.parcelDetails),
            status: parcel.status
        }))

        return res.send(data[0])
    })
})

app.delete('/parcel/:id', (req,res) => {
    const deleteQuery = 'delete from parcel where id=?'

    const values = [
        req.params.id
    ]

    db.query(deleteQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }
        return res.send('Deleted Successfully')
    })
})

// app.put('/parcel/:id', (req,res) => {

//     // Validate zip code (assuming it should be a 5-digit number)
//     const RNRegex = /^(?:P)?[0-9]{4}$/; 
//     if (!RNRegex.test(req.body.referenceNumber)){
//         return res.status(400).json({ message: 'Invalid reference Number' });
//     }

//     const Nameregex = /^[A-Za-z\s]{1,50}$/; // Example: letters and spaces, max length 50

//     if(!Nameregex.test(req.body.senderName)) {
//         return res.status(400).json({error: 'Invalid sender name'})
//     }

//     if(!Nameregex.test(req.body.recipientName)) {
//         return res.status(400).json({error: 'Invalid recipient name'})
//     }
    
//     // const isValidDate = (senderDate, recipientDate) => {
//     //     const regex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD format
//     //     return regex.test(senderDate, recipientDate) && !isNaN(new Date(senderDate, recipientDate).getTime());
//     // };

//     // if(!isValidDate) {
//     //     return res.status(400).json({error: 'Invalid date'})
//     // }

//     const Dateregex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD format

//     if(!Dateregex.test(req.body.senderDate) && !isNaN(new Date(senderDate).getTime())) {
//         return res.status(400).json({error: 'Invalid sender date'})
//     }

//     if(!Dateregex.test(req.body.recipientDate) && !isNaN(new Date(recipientDate).getTime())) {
//         return res.status(400).json({error: 'Invalid recipient date'})
//     }
// })

app.put('/parcel/:id', (req, res) => {
    const updateQuery = 'update parcel set senderDetails=?, recipientDetails=?,  parcelDetails=?, status=? where id=?'

    const { senderDetails, recipientDetails, parcelDetails } = req.body;

    if (!senderDetails || !recipientDetails || !parcelDetails) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Serialize the objects to JSON
    const senderDetailsJSON = JSON.stringify(senderDetails);
    const recipientDetailsJSON = JSON.stringify(recipientDetails);

     // Check if parcelDetails is an array
    if (!Array.isArray(parcelDetails)) {
        return res.status(400).json({ error: 'parcelDetails must be an array' });
    }

    parcelDetails.forEach(parcel => {
        const { weight, deliveryCharge, totalAmount, dueAmount, status } = parcel;

        if (!weight || !deliveryCharge || !totalAmount || !dueAmount || !status) {
            return res.status(400).json({ error: 'All parcel details fields are required' });
        }

        const validStatuses = ['ACCEPTED', 'COLLECTED', 'SHIPPED', 'IN-TRANSIT', 'DELIVERED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Combine parcel details into a single JSON object
        const parcelDetailsJSON = JSON.stringify({ weight, deliveryCharge, totalAmount, dueAmount});

        db.query(updateQuery, [senderDetailsJSON, recipientDetailsJSON, parcelDetailsJSON, status,  req.params.id], (err, data) => {
            if (err) {
                if (err.errno === 1062) {
                    return res.status(500).json({ statusCode: 500, statusMessage: 'Duplicate entry' });
                }
                return res.status(500).json(err);
            }
            return res.status(201).json({ statusCode: 201, statusMessage: 'Updated Successfully' });
        });
    });
});

const getBranchIdByBranchCode = (branchCode) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM branch WHERE branchCode = ?';
      db.query(query, [branchCode], (err, data) => {
        if (err) {
          reject(err);
        } else if (data.length === 0) {
          resolve(new Error('Branch not found'));
        } else {
          resolve(data[0].id);
        }
      });
    });
  };

app.post('/staff', async (req,res) => {
    const createQuery = 'insert into staff(`staffId`, `branchId`, `position`) values(?)'

    const values = [
        req.body.staffId,
        req.body.branch,
        req.body.position,
    ]

    // Validation function to check if any value is empty
    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate admin Id (assuming it should be a 4-digit number)
    const AIdregex = /^(?:A)?[0-9]{3}$/;     
    if (req.body.role ==='ADMIN' && !AIdregex.test(req.body.adminId)){
        return res.status(400).json({ message: 'Invalid admin Id' });
    }

    const SIdregex = /^(?:Y)?[AMSD][0-9]{3}$/;  
    if (!SIdregex.test(req.body.staffId)){
        return res.status(400).json({ message: 'Invalid staff Id' });
    }

    const BCregex = /^(?:BR)?[0-9]{3}$/;  
    if (!BCregex.test(req.body.branch)){
        return res.status(400).json({ message: 'Invalid branch code' });
    }

    // Get branchId by branchCode
    const branchId = await getBranchIdByBranchCode(req.body.branch);

    if (!branchId) {
        return res.status(404).json({ error: 'Branch not found' });
      }

    const validPosition = ['ADMIN', 'MANAGER', 'STAFF', 'DELIVERY_PERSON']; // Example statuses

    if(!validPosition.includes(req.body.position)){
        return res.status(400).json({error: 'Invalid position'})
    }

    values[1] = branchId;

    db.query(createQuery, [values], (err,data) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(500).json({statusCode:500, statusMessage:'Duplicate entry'})
            }
            return res.status(500).json(err)
        }
        return res.status(201).json({statusCode:201, statusMessage:'Created Successfully'})
    })
})


app.get('/staff', (req,res) => {

    const getAllQuery = `select staff.id, staff.staffId, fullName, branchName, position, email, userprofile.contactNumber from staff 
                         left join userprofile on staff.id = userprofile.staffId 
                         join branch on branch.id = staff.branchId`

    db.query(getAllQuery, (err,data) => {
        if(err) {
            return res.json(err)
        } 
        return res.send(data)
    })
})

app.get('/staff/:id', (req,res) => {
    const getByIdQuery = `select staff.staffId, fullName, branchCode as branch, position, email, userprofile.contactNumber from staff 
                         left join userprofile on staff.staffId = userprofile.id 
                         join branch on branch.id = staff.branchId where staff.id=?`

    const values = [
        req.params.id
    ]

    db.query(getByIdQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }
        return res.send(data[0])
    })
})

app.delete('/staff/:id', (req,res) => {
    const deleteQuery = 'delete from staff join userprofile on userprofile.id = staff.staffId where staff.id=?'

    const values = [
        req.params.id
    ]

    db.query(deleteQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }
        return res.send('Deleted Successfully')
    })
})

const updateBranchIdByBranchCode = (branchCode) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM branch WHERE branchCode = ?';
      db.query(query, [branchCode], (err, data) => {
        if (err) {
          reject(err);
        } else if (data.length === 0) {
          resolve(new Error('Branch not found'));
        } else {
          resolve(data[0].id);
        }
      });
    });
  };

app.put('/staff/:id', async (req,res) => {
    const updateQuery = 'update staff set branchId=?, position=? where id=?'

    const values = [
        req.body.branch,
        req.body.position,
        req.params.id
    ]

    // Validation function to check if any value is empty
    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const BCregex = /^(?:BR)?[0-9]{3}$/;  
    if (!BCregex.test(req.body.branch)){
        return res.status(400).json({ message: 'Invalid branch code' });
    }

    const validPosition = ['ADMIN', 'MANAGER', 'STAFF', 'DELIVERY_PERSON']; // Example statuses

    if(!validPosition.includes(req.body.position)){
        return res.status(400).json({error: 'Invalid position'})
    }

    // Get branchId by branchCode
    const branchId = await updateBranchIdByBranchCode(req.body.branch);

    if (!branchId) {
        return res.status(404).json({ error: 'Branch not found' });
    }

    values[0] = branchId;

    db.query(updateQuery, values, (err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(201).send({statusCode:201, statusMessage:'Updated Successfully'})
    })
})

app.get('/report', (req, res) => {
    const { status, fromDate, toDate } = req.query;

    console.log('Received Query Parameters:', { status, fromDate, toDate });
  
    const getQuery = `SELECT * FROM parcel WHERE status = ? AND 
                      JSON_EXTRACT(parcelDetails, '$.date') >= ? AND 
                      JSON_EXTRACT(parcelDetails, '$.date') <= ?`;
  
    const values = [
      status,
      fromDate,
      toDate
    ];

    console.log('Executing Query:', getQuery, values);
  
    db.query(getQuery, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
  
    //   const results = data.map(parcel => ({
    //     status: parcel.status,
    //     parcelDetails: JSON.parse(parcel.parcelDetails),
    //     recipientDetails: JSON.parse(parcel.recipientDetails)
    //   }));

    //   console.log('Parsed Results:', results);
  
      const filteredData = values.filter(item => {
        const itemDate = new Date(item.date);
        const from = new Date(fromDate);
        const to = new Date(toDate);
  
        return (
          (status === 'All' || item.status === status) &&
          itemDate >= from &&
          itemDate <= to
        );
      });

      console.log('Filtered Data:', filteredData);
  
      res.json(filteredData);
    });
});


// import http from 'http';
// import formidable from 'formidable'
// import fs from 'fs';
  
// http.createServer(function (req, res) {
// if (req.url == '/fileupload') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//     var oldpath = files.filetoupload.filepath;
//     var newpath = 'C:/Users/Your Name/' + files.filetoupload.originalFilename;
//     fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//     });
// });
// } else {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
// }
// })

app.listen(6431, () => {
    console.log("Running")
})