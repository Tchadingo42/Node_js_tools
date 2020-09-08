const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection(
{
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASS,
        database: process.env.DATABASE
    
});

exports.login = async (req, res)=>
{
    try
    {
        const { email, password} = req.body;
        if (!email || !password)
        {
            return res.status(400).render('login', 
            {message: 'Invalid email or password'});
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

exports.register = (req, res) =>
{
    console.log(req.body);

    const {name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results)=>
    {
        if (error)
        {
            console.log(error);
        }
        if (results.length > 0)
        {
            return res.render('register',
            {
                message: 'this email is already taken'
            });
        }
        else if (passwordConfirm !== password)
        {
            return res.render('register', 
            {
                message: 'The two passwords are not the same'
            });
        }
        
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) =>
        {
            if (error)
            {
                console.log(error);
            }
            else
            {
                console.log(results);
                res.render('register', 
                {
                    message: 'User registered'
                })
            }
        })
    });

   // res.send("[+] The form data have been submitted");
}