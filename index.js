// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder

 
// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here
// This is a dummy API to test using the code snippet given in Step 5.
// app.get('/welcome', (req, res) => {
//   res.json({status: 'success', message: 'Welcome!'});
// });

// app.get('/login', (req, res) => {
//   res.render('../views/pages/login')
// });

// app.post('/login', (req, res) => {
//     // check if password from request matches with password in DB
//     // const match = await bcrypt.compare(req.body.password, user.password);
//     const match = bcrypt.compare(req.body.password, user.password);

//     //save user details in session like in lab 7
//     req.session.user = user;
//     req.session.save();
//     // Authentication Middleware.
//     const auth = (req, res, next) => {
//     if (!req.session.user) {
//         // Default to login page.
//         return res.redirect('/login');
//     }
//     next();
//     };

//     // Authentication Required
//     app.use(auth);
// });

// Display HTML for Register page
app.get('/register', (req, res) => {
  res.render('pages/register.hbs', {})
});

// Register
app.post('/register', async (req, res) => {
  const { email, username, institution, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.none(
      'INSERT INTO users (email, password, username, institution) VALUES ($1, $2, $3, $4)',
      [email, hash, username, institution || null]
    );
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.redirect('/register');
  }

});

app.get('/login', (req, res) => {
  res.render('pages/login.hbs', {})
});

app.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if(!user) {
      return res.redirect('/register');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      return res.render('pages/login', { message: 'Invalid username or password', error: true });
    }
    req.session.user = user;
    req.session.save(() => {
      res.redirect('/discover');
    });
  } catch (error) {
    console.log('login error', error);
    res.redirect('/login');
  }
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

app.use(auth);

app.get('/calendar', (req, res) => {
  res.render('pages/calendar.hbs', {}) // ! Calendar Page still needs to get added
});

app.get('/game', (req, res) => {
  res.render('pages/game.hbs', {}) // ! Game Page still needs to get added
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    if(err) {
      console.error('Error during logout:', err);
      return res.render('pages/logout', { message: 'Error logging out. Please try again.', error: true });
    }
    return res.render('pages/logout', { message: 'Successfully logged out!' });
  });
  
});
// *****************************************************
// <!-- Section 5 : Start Server -->
// *****************************************************
const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
