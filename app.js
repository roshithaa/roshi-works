// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var passwordHash = require('password-hash');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true
  }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Chinnubinnu$27',
    database: 'funandfestive',
  });
  
  // Connect to the database
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
  });

  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, events) => {
    if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        return res.render('index', {   events: null });
    }
      return res.render('index', {   events: events });
    });
});

app.get('/events', (req, res) => {
  res.render('events');
});
app.get('/Catering', (req, res) => {
  res.render('Catering');
});
app.get('/Makeup', (req, res) => {
  res.render('Makeup');
});

app.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.render('login', { errorMessage: 'Email and password are required.'});
  }

   const sql = 'SELECT * FROM users WHERE email = ?';
   db.query(sql, [email], async (err, results) => {
     if (err) {
       console.error('Error executing MySQL query: ' + err.stack);
       return res.render('login', { errorMessage: 'Internal Server Error'});
     }
 
     if (results.length === 0) {
       return res.render('login', { errorMessage: 'Invalid Email or password.'});
     }
 
     const user = results[0];
     const passwordMatch = await passwordHash.verify(password, user.password);
 
     if (passwordMatch) {
        req.session.userId = user.id;
        req.session.name = user.name;
        res.redirect('/dashboard');
    } else {
       res.render('login', { errorMessage:'Invalid username or password.'});
     }
   });
});

// Define a route for the signup page
app.get('/signup', (req, res) => {
    res.render('signup', { errorMessage: null });
});
  
  // Handle the signup form submission
app.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.render('signup', { errorMessage: 'All fields are required.' });
    }
  
    if (password !== confirmPassword) {
       return res.render('signup', { errorMessage: 'Password and Confirm Password must match.' });
    }
    const hashedPassword = await passwordHash.generate(password);

    const user = {
        name: name,
        email: email,
        password: hashedPassword,
    };  
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    return res.render('login', { errorMessage: 'User Registerd Successfully.'});
    });
  });

    const requireLogin = (req, res, next) => {
        if (!req.session.userId) {
        return res.redirect('/login');
        }
        next();
    };

  // Dashboard route
    app.get('/dashboard', requireLogin, (req, res) => {
        const sql = 'SELECT * FROM users';
        db.query(sql, (err, users) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).send('Internal Server Error');
        }
        res.render('dashboard', { username: req.session.name, users: users});
        });
    });
 
    app.get('/dashboard/events', (req, res) => {
      const sql = 'SELECT * FROM events';
        db.query(sql, (err, events) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).send('Internal Server Error');
        }
        res.render('eventindex', { username: req.session.name, events: events , errorMessage: null , successMessage:null});
        });
    });

    
  // Handle the signup form submission
app.post('/create-event', (req, res) => {
  const { eventName } = req.body;
  if (!eventName) {
      return res.redirect('dashboard/events');
  }
  
  const event = {
      name: eventName,
  };  
  const sql = 'INSERT INTO events SET ?';
  db.query(sql, event, (err, results) => {
  if (err) {
    console.error('Error executing MySQL query: ' + err.stack);
    res.status(500).send('Internal Server Error');
    return;
  }
  return res.redirect('dashboard/events');
  });
});


    // Logout route
    app.post('/logout', (req, res) => {
        // Destroy the session on logout
        req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session: ' + err.stack);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
        });
    });
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
