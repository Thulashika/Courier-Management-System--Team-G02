import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import validator from 'validator'
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import path from 'path'
import nodemailer from 'nodemailer'
import cookieParser from 'cookie-parser';
import multer from 'multer'
import serverless from 'serverless-http'

const db = mysql.createConnection({
    host: 'localhost',//'bp0wtidmogtltqmcwep6-mysql.services.clever-cloud.com', //
    database: 'Courier-Service-Project',//'bp0wtidmogtltqmcwep6',  //
    user: 'root',//'uoqgxk5rfbu3o6iy', //
    password: ''//'8amjaoyTmX3Mtc0CRTU1',  //''
    //port: 3306
})

const app = express()

app.use(express.json()) 

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true })); 

app.set('views', path.join('../frontend/login', 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser())

const authenticationToken = (req, res, next) => {
    const token = req.headers['authentication']?.split(' ')[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

const verifyToken = (req, res, next) => {
    console.log(req.cookies.token)
    const token = req.cookies.token;
    if(!token) return res.status(403).send('A token is required for authentication');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    }
    catch( err) {
        return res.status(401).send('Invalid token');
    }
    
    return next();
    
}

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
    const createQuery = 'INSERT INTO userprofile (`fullName`, `role`, `staffId`, `contactNumber`, `email`, `password`) VALUES (?)';

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), saltRounds);
    let staffId = null; 

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

    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const CNMPregex = /^(07[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/;  
    if (!CNMPregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

    if (req.body.password.length < 4 || req.body.password.length > 15) {
        return res.status(400).json({ error: 'Password must be between 4 and 15 characters' });
    }

    const values = [
        req.body.fullName,
        req.body.role,
        staffId,
        req.body.contactNumber,
        req.body.email,
        hashedPassword
    ];

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
        return res.status(201).json({ statusCode: 201, statusMessage: 'Created Successfully'});
    });
});


const JWT_SECRET = 'supersecretkey';

app.post('/userLogin', async (req,res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (password.length < 4 || password.length > 15) {
        return res.status(400).json({ error: 'Password must be between 4 and 15 characters' });
    }

    if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Password is required' });
    }

    const selectQuery = `
        SELECT 
            userprofile.*,
            staff.position,
            staff.branchId,
            branch.branchCode
        FROM 
            userprofile
        LEFT JOIN 
            staff 
        ON 
            userprofile.staffId = staff.id
        LEFT JOIN 
            branch 
        ON 
            staff.branchId = branch.id
        WHERE 
            userprofile.email = ?
    `;
    
    db.query(selectQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'No account found with this email' });
        }

        const user = results[0];

        bcrypt.compare(password.toString(), user.password, async (err, isMatch) => {
            if (err) {
                return res.status(500).json(err);
            }
            
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: true});

            if(user.image) {
                user.image = await getPreSignedUrl(bucketName, extractFileKey(user.image))
            }

            return res.status(200).json({
                statusCode:200, 
                message: 'Login successful', 
                token, email, 
                id: user.id, role: user.role, fullName: user.fullName, image: user.image, 
                staffId: user.staffId, position: user.position, 
                branchId: user.branchId, branchCode: user.branchCode 
            });
        });
    });
})

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const selectQuery = 'SELECT * FROM userprofile WHERE email = ? limit 1';
    db.query(selectQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);

        try {
            await sendPasswordResetEmail(email, token, expirationTime.toLocaleString());

             const insertQuery = 'INSERT INTO `password-reset` (email, token, expires) VALUES (?, ?, ?)';
             db.query(insertQuery, [email, token, expirationTime], (err) => {
                 if (err) {
                     console.error('Error inserting token into database:', err);
                     return res.status(500).json({ message: 'Internal server error' });
                 }
                 return res.status(200).json({ statusCode: 200, message: 'Password reset email sent' });
             });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending password reset email' });
        }
    });
})

async function sendPasswordResetEmail(email, token, expirationTime) {
    try{
        const transporter = nodemailer.createTransport({
            host: 'http://localhost:6431/reset-password',
            port: 587,
            secure: false, 
            requireTLS: true,
            service: 'gmail',
            auth: {
                user: 'lasibala24@gmail.com',
                pass: 'jmiv fdly srot stod',
            },
        });

        const mailOptions = {
            from: 'lasibala24@gmail.com',
            to: email,
            subject: 'Password Reset Instructions',
            html: `
                 <p>You requested a password reset for your account.</p>
                <p>Click <a href="http://localhost:3000/reset-password?token=${token}">here</a> to reset your password.</p>
                <p>This link will expire on ${expirationTime}.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        };

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

app.post('/reset-password', async (req, res) => {
    const { password, confirmPassword, token } = req.body;

    if(password !== confirmPassword) {
        return res.json({statusCode: 500, statusMessage:('reset-password', {error_message: 'Password not match'})});
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), saltRounds);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const email = decoded.email;

        db.query('SELECT * FROM `password-reset` WHERE email = ? AND token = ? LIMIT 1', [email,token], (err, results) => {
            if (err) {
                return res.status(500).json('Internal Server Error');
            }

            if (results.length === 0) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            const tokenExpiration = new Date(results[0].expires);
            const currentTime = new Date();

            if (currentTime > tokenExpiration) {
                return res.status(400).json({ message: 'Token has expired' });
            }

            if (results.length > 0) {
                db.query('UPDATE `userprofile` SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json('Internal Server Error');
                    }

                    const deleteQuery = 'DELETE FROM `password-reset` WHERE email = ?';
                    db.query(deleteQuery, [email], (err) => {
                        if (err) {
                            console.error('Error deleting token:', err);
                        }
                    });

                    return res.status(200).json({statusCode: 200, statusMessage: 'reset-password-success'});
                });
            } else {
                return res.json('404');
            }
        });
    })
})

app.get('/userprofile/count/customers', (req, res) => {

    const query = 'SELECT count(*) AS count FROM userprofile WHERE role = "CUSTOMER"';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});


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

    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const BCregex = /^(?:BR)?[0-9]{3}$/;  
    if (!BCregex.test(req.body.branchCode)){
        return res.status(400).json({ message: 'Invalid branch code' });
    }

    const CNregex = /^(7[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/;    
    if (!CNregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

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

app.get('/branch', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const getColumnNamesQuery = `SHOW COLUMNS FROM branch`;

    db.query(getColumnNamesQuery, (err, columns) => {
        if (err) {
            return res.json(err);
        }

        let query = `select * from branch`;
        let queryParams = [];

        if (search) {
            const searchPattern = `%${search}%`;
            query += ` WHERE branch.branchCode LIKE ? OR 
                              branchName LIKE ? OR 
                              branchAddress LIKE ? OR 
                              city LIKE ? OR 
                              contactNumber LIKE ? OR 
                              zipCode LIKE ?`;
            queryParams = Array(6).fill(searchPattern);
        }

        query += ' LIMIT ?, ?';
        queryParams.push(offset, limit);

        db.query(query, queryParams, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send({data, count: data.length});
        });
    });
});

app.get('/branch/count', (req, res) => {

    const query = 'select count(*) as count from branch';

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results[0]);
    });
});

app.get('/dashboard/count', (req, res) => {
    // Query to get total counts for various entities
    const countQuery = `
        SELECT 
            (SELECT COUNT(*) FROM userprofile WHERE role = 'CUSTOMER') AS userCount,
            (SELECT COUNT(*) FROM branch) AS branchCount, 
            (SELECT COUNT(*) FROM staff) AS totalStaffCount,
            (SELECT COUNT(*) FROM staff WHERE position = 'STAFF') AS staffCount, 
            (SELECT COUNT(*) FROM staff WHERE position = 'DELIVERY_PERSON') AS delivery_personCount,
            (SELECT COUNT(*) FROM parcel) AS parcelCount,
            (SELECT COUNT(*) FROM parcel WHERE status = 'ACCEPTED') AS acceptCount,
            (SELECT COUNT(*) FROM parcel WHERE status = 'DELIVERED') AS deliverCount,
            (SELECT COUNT(*) FROM parcel WHERE status = 'Processed_and_Ready_to_Ship') AS collectCount,
            (SELECT COUNT(*) FROM parcel WHERE status = 'IN-TRANSIT') AS intransitCount,
            (SELECT COUNT(*) FROM parcel WHERE status = 'SHIPPING') AS shipCount
    `;

    // Query to get the new and old customer count based on current and previous weeks
    const customerCountQuery = `
        SELECT 
            COUNT(CASE WHEN WEEK(createdAt) = WEEK(CURDATE()) THEN 1 END) AS new_customer_count,
            COUNT(CASE WHEN WEEK(createdAt) = WEEK(CURDATE()) - 1 THEN 1 END) AS old_customer_count
        FROM userprofile
        WHERE role = 'CUSTOMER';
    `;

    // Query to get the parcel counts based on the current and previous week
    const parcelCountsQuery = `
        SELECT 
            DAYNAME(createdAt) AS day,
            SUM(WEEK(createdAt) = WEEK(LAST_DAY(CURDATE()))) AS newParcelCount, 
            SUM(WEEK(createdAt) < WEEK(LAST_DAY(CURDATE()))) AS oldParcelCount 
        FROM parcel
        GROUP BY 
            DAYNAME(createdAt)
        UNION ALL
        SELECT 
            'TOTAL' AS day,
            SUM(WEEK(createdAt) = WEEK(LAST_DAY(CURDATE()))) AS newParcelCount,
            SUM(WEEK(createdAt) < WEEK(LAST_DAY(CURDATE()))) AS oldParcelCount
        FROM parcel
        ORDER BY 
            FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'TOTAL');
    `;

    // Query to get monthly customer counts
    const monthlyCustomerCountQuery = `
        SELECT 
            MONTHNAME(createdAt) AS month,
            COUNT(*) AS totalCount,
            -- New customers: Those who registered in the last week of the month
            COUNT(CASE WHEN WEEK(createdAt) = WEEK(LAST_DAY(CURDATE())) THEN 1 END) AS newCustomerCount,
            -- Old customers: Those who registered before the last week of the month
            COUNT(CASE WHEN WEEK(createdAt) < WEEK(LAST_DAY(CURDATE())) THEN 1 END) AS oldCustomerCount
        FROM 
            userprofile
        WHERE 
            role = 'CUSTOMER' AND
            YEAR(createdAt) = YEAR(CURDATE()) 
        GROUP BY 
            MONTH(createdAt)
        ORDER BY 
            MONTH(createdAt);
    `;

    // Execute the queries sequentially to get all required data
    db.query(countQuery, (err, countResults) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query(customerCountQuery, (err, customerCountResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            db.query(parcelCountsQuery, (err, parcelCountsResults) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                db.query(monthlyCustomerCountQuery, (err, monthlyCustomerResults) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    // Extract daily and total parcel counts from the result
                    const totalCounts = parcelCountsResults.find(item => item.day === 'TOTAL');
                    const dailyCounts = parcelCountsResults.filter(item => item.day !== 'TOTAL');

                    // Respond with the aggregated data
                    res.json({
                        userCount: countResults[0].userCount,
                        branchCount: countResults[0].branchCount, 
                        totalStaffCount: countResults[0].totalStaffCount,
                        staffCount: countResults[0].staffCount, 
                        delivery_personCount: countResults[0].delivery_personCount,
                        parcelCount: countResults[0].parcelCount,
                        acceptCount: countResults[0].acceptCount,
                        deliverCount: countResults[0].deliverCount,
                        collectCount: countResults[0].collectCount,
                        intransitCount: countResults[0].intransitCount,
                        shipCount: countResults[0].shipCount,
                        dailyParcelCounts: dailyCounts,
                        totalCurrentParcelCount: totalCounts.newParcelCount,
                        totalOldParcelCount: totalCounts.oldParcelCount,
                        new_customer_count: customerCountResults[0].new_customer_count,
                        old_customer_count: customerCountResults[0].old_customer_count,
                        monthlyCustomerCounts: monthlyCustomerResults // Monthly customer counts based on weeks
                    });
                });
            });
        });
    });
});

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

    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }
 
    const CNregex = /^(7[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/;   
    if (!CNregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

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

app.post('/parcel', (req, res) => {
    const createQuery = 'insert into parcel(`referenceNumber`, `senderDetails`, `recipientDetails`, `parcelDetails`, `status`) VALUES(?,?,?,?, ?)';

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
        const { referenceNumber, weight, deliveryCharge, totalAmount, dueAmount, status, paymentMethod } = parcel;

        if (!referenceNumber || !weight || !deliveryCharge || !totalAmount || !dueAmount || !status) {
            return res.status(400).json({ error: 'All parcel details fields are required' });
        }

        const validStatuses = ['ACCEPTED', 'Processed_and_Ready_to_Ship', 'SHIPPING', 'IN-TRANSIT', 'DELIVERED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const RNRegex = /^(?:P)?[0-9]{4}$/;
        if (!RNRegex.test(referenceNumber)) {
            return res.status(400).json({ message: 'Invalid reference Number' });
        }

        const parcelDetailsJSON = JSON.stringify({ weight, deliveryCharge, totalAmount, dueAmount, paymentMethod });

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

app.get('/parcel', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const getColumnNamesQuery = "SHOW COLUMNS FROM parcel";

    db.query(getColumnNamesQuery, (err, columns) => {
        if (err) {
            return res.json(err);
        }

        let query = 'SELECT * FROM parcel';
        let queryParams = [];

        if (search) {
            const searchTerms = search.split(' ');
            const searchConditions = searchTerms.map(term => {
                const searchPattern = `%${term}%`;
                return columns.map(column => {
                    if (column.Type.startsWith('json')) {
                        return `JSON_EXTRACT(${column.Field}, '$.firstName') LIKE ? OR
                                JSON_EXTRACT(${column.Field}, '$.lastName') LIKE ? OR
                                JSON_EXTRACT(${column.Field}, '$.date') LIKE ?`;
                    } else {
                        return `${column.Field} LIKE ?`;
                    }
                }).join(' OR ');
            }).join(' OR ');

            query += ` WHERE ${searchConditions}`;
            queryParams = searchTerms.reduce((params, term) => {
                const searchPattern = `%${term}%`;
                return params.concat(columns.reduce((p, column) => {
                    if (column.Type.startsWith('json')) {
                        return p.concat([searchPattern, searchPattern, searchPattern]);
                    } else {
                        return p.concat([searchPattern]);
                    }
                }, []));
            }, []);
        }
        
        // Add pagination
        query += ' LIMIT ?, ?';
        queryParams.push(offset, limit);

        // Execute the query
        db.query(query, queryParams, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send(data);
        });
    });
});


app.get('/parcel/count', (req, res) => {

    const query = 'select count(*) as count from parcel';

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results[0]);
    });
});

const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, results) => {
        if (err) {
          return reject(err); 
        }
        resolve(results); 
      });
    });
  };

app.get('/parcel/:id', async (req,res) => {

    const [parcelResult] = await executeQuery('SELECT * FROM parcel WHERE id = ?', [req.params.id]);

    const details = 'select * from parcel where JSON_EXTRACT(senderDetails, "$.NIC") = ? and JSON_EXTRACT(recipientDetails, "$.NIC") = ?'
    
    db.query(details, [JSON.parse(parcelResult.senderDetails).NIC, JSON.parse(parcelResult.recipientDetails).NIC], (err,data) => {
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

        const combinedParcels = [];

        data.forEach(parcel => {
            const existingParcel = combinedParcels.find(
                p =>
                JSON.stringify(p.senderDetails) === JSON.stringify(parcel.senderDetails) &&
                JSON.stringify(p.recipientDetails) === JSON.stringify(parcel.recipientDetails)
            );

            if (existingParcel) {
                existingParcel.referenceNumbers.push(parcel.referenceNumber);
                existingParcel.parcelDetails.push(parcel.parcelDetails);
                existingParcel.statuses.push(parcel.status);
            } else {
                combinedParcels.push({
                    senderDetails: parcel.senderDetails,
                    recipientDetails: parcel.recipientDetails,
                    referenceNumbers: [parcel.referenceNumber],
                    parcelDetails: [parcel.parcelDetails],
                    statuses: [parcel.status]
                });
            }
        });

        res.send(combinedParcels[0])
    })
})

app.get('/QRCode/:id', (req,res) => {
    const getByIdQRQuery = 'select recipientDetails, status from parcel where id = ?'

    const values = [
        req.params.id
    ]

    db.query(getByIdQRQuery, values, (err,data) => {
        if(err) {
            return res.json(err)
        }

        data = data.map(parcel => {
            const recipientDetails = JSON.parse(parcel.recipientDetails)

            return{
                recipientFirstName: recipientDetails.firstName,
                recipientLastName: recipientDetails.lastName,
                recipientAddress: recipientDetails.address,
                recipientContactNumber: recipientDetails.contactNumber,
                status: parcel.status
            }
        })

        return res.send(data[0])
    })
})

app.get('/report', (req,res) => {
    const { fromDate, toDate, status } = req.query;
    const getReportQuery = 'select status, senderDetails, recipientDetails, parcelDetails from parcel'

    db.query(getReportQuery, (err,report) => {
        if(err) {
            return res.status(500).json({ message: 'Internal server error', error: err });
        }

        if (!Array.isArray(report)) {
            return res.status(500).json({ message: 'Unexpected result format', error: report });
        }

        let filteredData = report.map(parcel => {
            const senderDetails = JSON.parse(parcel.senderDetails)
            const recipientDetails = JSON.parse(parcel.recipientDetails)
            const parcelDetails = JSON.parse(parcel.parcelDetails)

            return{
                status: parcel.status,
                senderDate: senderDetails.date,
                recipientDate: recipientDetails.date,
                senderFirstName: senderDetails.firstName,
                senderLastName: senderDetails.lastName,
                recipientFirstName: recipientDetails.firstName,
                recipientLastName: recipientDetails.lastName,
                parcelTotalAmount: parcelDetails.totalAmount
            }
        })

        const from = new Date(fromDate);
        const to = new Date(toDate);

        filteredData = filteredData.filter(item => {
        const senderDate = new Date(item.senderDate);
        const recipientDate = new Date(item.recipientDate);

        return (
            (status === 'All' || item.status === status) &&
            (senderDate >= from && senderDate <= to) &&
            (recipientDate >= from && recipientDate <= to)
        );
        });

        return res.send(filteredData)
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

app.put('/parcel/:id', (req, res) => {
    const updateQuery = 'update parcel set senderDetails=?, recipientDetails=?,  parcelDetails=?, status=? where id=?'

    const { senderDetails, recipientDetails, parcelDetails } = req.body;

    if (!senderDetails || !recipientDetails || !parcelDetails) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const senderDetailsJSON = JSON.stringify(senderDetails);
    const recipientDetailsJSON = JSON.stringify(recipientDetails);

    if (!Array.isArray(parcelDetails)) {
        return res.status(400).json({ error: 'parcelDetails must be an array' });
    }

    parcelDetails.forEach(parcel => {
        const { weight, deliveryCharge, totalAmount, dueAmount, status } = parcel;

        if (!weight || !deliveryCharge || !totalAmount || !dueAmount || !status) {
            return res.status(400).json({ error: 'All parcel details fields are required' });
        }

        const validStatuses = ['ACCEPTED', 'Processed_and_Ready_to_Ship', 'SHIPPING', 'IN-TRANSIT', 'DELIVERED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

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

    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

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

    const branchId = await getBranchIdByBranchCode(req.body.branch);

    if (!branchId) {
        return res.status(404).json({ error: 'Branch not found' });
      }

    const validPosition = ['ADMIN', 'MANAGER', 'STAFF', 'DELIVERY_PERSON']; 

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

app.get('/staff', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const getColumnNamesQuery = `SHOW COLUMNS FROM staff`;

    db.query(getColumnNamesQuery, (err, columns) => {
        if (err) {
            return res.json(err);
        }

        let query = `select staff.id, staff.staffId, fullName, branchCode as branch, position, email, userprofile.contactNumber from staff 
                         left join userprofile on staff.id = userprofile.staffId 
                         join branch on branch.id = staff.branchId`;
        let queryParams = [];

        if (search) {
            const searchPattern = `%${search}%`;
            query += ` WHERE staff.staffId LIKE ? OR 
                              fullName LIKE ? OR 
                              branchCode LIKE ? OR 
                              position LIKE ? OR 
                              email LIKE ? OR 
                              userprofile.contactNumber LIKE ?`;
            queryParams = Array(6).fill(searchPattern);
        }
        
        query += ' LIMIT ?, ?';
        queryParams.push(offset, limit);

        db.query(query, queryParams, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.send(data);
        });
    });
});

app.get('/staff/count', (req, res) => {

    const query = 'select count(*) as count from staff';

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results[0]);
    });
});

app.get('/staff/:id', (req,res) => {
    const getByIdQuery = `select staff.staffId, fullName, branchCode as branch, position, email, userprofile.contactNumber from staff 
                         left join userprofile on staff.id = userprofile.staffId 
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

    const validPosition = ['ADMIN', 'MANAGER', 'STAFF', 'DELIVERY_PERSON']; 

    if(!validPosition.includes(req.body.position)){
        return res.status(400).json({error: 'Invalid position'})
    }

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

app.post('/contactus', (req,res) => {
    const createQuery = 'insert into contact_us(`name`, `email`, `phoneNumber`, `message`) values(?)'

    const values = [
        req.body.name,
        req.body.email,
        req.body.phoneNumber,
        req.body.message
    ]

    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const phoneRegex = /^(7[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/;     
    if (!phoneRegex.test(req.body.phoneNumber)){
        return res.status(400).json({ message: 'Invalid Phone number' });
    }

    db.query(createQuery, [values], (err,data) => {
        if(err) {
            if(err.errno === 1062) {
                return res.status(500).json({statusCode:500, statusMessage:'Duplicate entry'})
            }
            {console.log(data)}
            return res.status(500).json(err)
        }
        return res.status(201).json({statusCode:201, statusMessage:'contact Successfully'})
    })
})

app.get('/contactus', (req, res) => {

    const query = 'select * from contact_us'

    const value = [
        req.params.id
    ]

    db.query(query, value, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.send(data);
    });
});

app.use(express.static('../frontend/src/assets'))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import dotenv from 'dotenv';
import { access } from 'fs';

dotenv.config()
const region = 'ap-southeast-2';
const bucketName = 'courrier-service-images';

const s3 = new S3Client(
    { 
        region: region, 
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        } 
    }
);

app.post('/profile', upload.single('image'), (req,res) => {
    const image = req.file.buffer
    const updateUserProfileQuery = 'update userprofile set image=?'
    
    db.query(updateUserProfileQuery, [image], (err, profile) => {
        if(err) {
            return res.json({statusCode: 500, statusMessage: 'Error'})
        }
        return res.json({statusCode: 200, statusMessage: 'Success'})
    })
})

app.put('/profile/:id', upload.single('image'), async (req, res) => {

    let image = req.file ? req.file.buffer : null

    if (image) {
        const params = {
            Bucket: bucketName,
            Key: req.file.originalname,
            Body: image,
            ContentType: req.file.mimetype
        };

        try {
            const data = await s3.send(new PutObjectCommand(params));
            image = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
          } catch (err) {
            console.error('Error', err);
          }
    }

    const updateProfileQuery = 'update userprofile set image=?, fullName=?, password=?, contactNumber=?, gender=?, dob=? where id=?'

    let hashedPassword = null;

    if(req.body.password.length < 10 && req.body.password.length > 4) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(req.body.password.toString(), saltRounds);
    
        if (req.body.password.length < 4 || req.body.password.length > 10) {
            return res.status(400).json({ error: 'Password must be between 4 and 10 characters' });
        }
    }

    const CNMPregex = /^(07[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/;   
    if (!CNMPregex.test(req.body.contactNumber)){
        return res.status(400).json({ message: 'Invalid contact number' });
    }

    const values = [
        image,
        req.body.fullName,
        hashedPassword ? hashedPassword : req.body.password,
        req.body.contactNumber,
        req.body.gender,
        req.body.birthday,
        req.params.id
    ];

    const isValid = values.every(value => value !== undefined && value !== '');

    if (!isValid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(updateProfileQuery, values, (err, data) => {
        if(err) {
            return res.status(500).json({ statusMessage: 'Internal server error' });
        }

        return res.status(200).json({ statusCode: 201, statusMessage: 'User Profile Updated Successfully'});
    });
});

const getPreSignedUrl = async (bucket, key) => {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    });
  
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return url;
  };

  const extractFileKey = (url) => {
    const urlParts = new URL(url);
    const path = urlParts.pathname;
    return path.substring(1); 
  };
  

app.get('/profile/:id', (req,res) => {
    const getProfileQuery = 'select * from userprofile where id=?'

    db.query(getProfileQuery, [req.params.id], async (err,profile) => {
        if(err) {
            return res.status(500).json({ statusCode: 500, statusMessage: 'Internal server error'});
        }

        if(profile.length === 0) {
            return res.status(404).json({statusCode: 404, statusMessage: 'user not found'})
        }

        if(profile[0]?.image) {
            profile[0].image = await getPreSignedUrl(bucketName, extractFileKey(profile[0]?.image))
        }
        
        return res.status(200).json({statusCode: 200, statusMessage: 'user found', profile: profile[0]})
    })
})

import FedexTrackingController from './controllers/FedexTrackingController.js'

app.post('/fedex/track', FedexTrackingController.trackFedexShipment)

app.get('/track_parcels/:referenceNumber', (req, res) => {
    const getByTrackingNoQuery = 'select status from parcel where referenceNumber=?'

    const values = [
        req.params.referenceNumber
    ]

    db.query(getByTrackingNoQuery, [values], (err, data) => {

        if (err) {
            return res.status(500).json({ error: 'Internal Server Error', details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'Tracking number not found' });
        }
        return res.json({ statusCode: 200, status: data[0]});
    })
})

app.post('/get-otp', (req, res) => {
    const { phoneNumber } = req.body;
    res.status(200).json({ message: 'OTP sent successfully' });
});

app.post('/verify-otp', (req, res) => {
    const { otp } = req.body;

    if (otp === "expectedOTP") {
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

app.post('/resend-otp', (req, res) => {
    const { phoneNumber } = req.body;

    res.status(200).json({ message: 'OTP resent successfully' });
});
  
app.get('/userStatus/:id', (req, res) => {

    const getUser = 'select fullName from userprofile where id=?'

    const value = [
        req.params.id
    ]

    db.query(getUser, value, (err, data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(200).json({statusCode:200, statusMessage:'User found'})
    })
});

// app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 6431, () => {
//     console.log("Running")
// })

app.listen(process.env.PORT || 6431, () => {
    console.log("Running")
})