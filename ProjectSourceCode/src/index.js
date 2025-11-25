// // *****************************************************
// // <!-- Section 1 : Import Dependencies -->
// // *****************************************************

// const express = require('express'); // To build an application server or API
// const app = express();
// const handlebars = require('express-handlebars');
// const Handlebars = require('handlebars');
// const path = require('path');
// const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
// const bodyParser = require('body-parser');
// const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
// const bcrypt = require('bcryptjs'); //  To hash passwords
// const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder

 
// // *****************************************************
// // <!-- Section 2 : Connect to DB -->
// // *****************************************************

// // create `ExpressHandlebars` instance and configure the layouts and partials dir.
// const hbs = handlebars.create({
//   extname: 'hbs',
//   layoutsDir: __dirname + '/views/layouts',
//   partialsDir: __dirname + '/views/partials',
// });

// // database configuration
// const dbConfig = {
//   host: 'db', // the database server
//   port: 5432, // the database port
//   database: process.env.POSTGRES_DB, // the database name
//   user: process.env.POSTGRES_USER, // the user account to connect with
//   password: process.env.POSTGRES_PASSWORD, // the password of the user account
// };

// const db = pgp(dbConfig);

// // test your database
// db.connect()
//   .then(obj => {
//     console.log('Database connection successful'); // you can view this message in the docker compose logs
//     obj.done(); // success, release the connection;
//   })
//   .catch(error => {
//     console.log('ERROR:', error.message || error);
//   });

// // *****************************************************
// // <!-- Section 3 : App Settings -->
// // *****************************************************

// // Register `hbs` as our view engine using its bound `engine()` function.
// app.engine('hbs', hbs.engine);
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// // initialize session variables

// app.use(                  // ----------------------------------------------
//   session({
//     secret: process.env.SESSION_SECRET || "my-local-secret",
//     saveUninitialized: false,
//     resave: false,
//   })
// );

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// // *****************************************************
// // <!-- Section 4 : API Routes -->
// // *****************************************************

// // TODO - Include your API routes here
// // This is a dummy API to test using the code snippet given in Step 5.
// // app.get('/welcome', (req, res) => {
// //   res.json({status: 'success', message: 'Welcome!'});
// // });

// // app.get('/login', (req, res) => {
// //   res.render('../views/pages/login')
// // });

// // app.post('/login', (req, res) => {
// //     // check if password from request matches with password in DB
// //     // const match = await bcrypt.compare(req.body.password, user.password);
// //     const match = bcrypt.compare(req.body.password, user.password);

// //     //save user details in session like in lab 7
// //     req.session.user = user;
// //     req.session.save();
// //     // Authentication Middleware.
// //     const auth = (req, res, next) => {
// //     if (!req.session.user) {
// //         // Default to login page.
// //         return res.redirect('/login');
// //     }
// //     next();
// //     };

// //     // Authentication Required
// //     app.use(auth);
// // });

// // Display HTML for Register page
// app.get('/register', (req, res) => {
//   res.render('pages/register.hbs', {})
// });

// // Register
// app.post('/register', async (req, res) => {
//   const { email, username, institution, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   try {
//     await db.none(
//       'INSERT INTO users (email, password, username, institution) VALUES ($1, $2, $3, $4)',
//       [email, hash, username, institution || null]
//     );
//     res.redirect('/login');
//   } catch (error) {
//     console.log(error);
//     res.redirect('/register');
//   }

// });

// app.get('/login', (req, res) => {
//   res.render('pages/login.hbs', {})
// });

// app.post('/login', async (req, res) => {
//   try {
//     const {username, password} = req.body;
//     const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
//     if(!user) {
//       return res.redirect('/register');
//     }
//     const match = await bcrypt.compare(password, user.password);
//     if(!match) {
//       return res.render('pages/login', { message: 'Invalid username or password', error: true });
//     }
//     req.session.user = user;
//     req.session.save(() => {
//       res.redirect('/discover');
//     });
//   } catch (error) {
//     console.log('login error', error);
//     res.redirect('/login');
//   }
// });

// // Calendar route - accessible without authentication for testing
// app.get('/calendar', (req, res) => {
//   res.render('pages/calendar.hbs', {}) // ! Calendar Page still needs to get added
// });

// const auth = (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect('/login');
//   }
//   next();
// }

// app.use(auth);

// app.get('/game', (req, res) => {
//   res.render('pages/game.hbs', {}) // ! Game Page still needs to get added
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy(() => {
//     if(err) {
//       console.error('Error during logout:', err);
//       return res.render('pages/logout', { message: 'Error logging out. Please try again.', error: true });
//     }
//     return res.render('pages/logout', { message: 'Successfully logged out!' });
//   });
  
// });

// // Searching for user
// app.get('/searchUser', async (req, res) => { // 
//   try {
//     console.log(req.body.username); // store the input to search 
//     const requestedUser = req.username;
//     const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
//     if(!user) {
//       return res.redirect('/friendList');
//     }

//   } catch (error) {
   
//   }
// });

// // List out all the friend 
// app.get('/listFriend', async (req, res) => { // 
//   try {
//     console.log(req.body.username); // store the input to search 
//     const requestedUser = req.username;
//     const user = await db.oneOrNone('SELECT * FROM friendList WHERE username = $1', [username]);
//     if(!user) {
//       return res.redirect('/friendList');
//     }

//   } catch (error) {
   
//   }
// });

// // *****************************************************
// // <!-- Section 5 : Start Server -->
// // *****************************************************
// const PORT = process.env.PORT || 3000;
// module.exports = app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


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

app.use(                  // ----------------------------------------------
  session({
    secret: process.env.SESSION_SECRET || "my-local-secret",
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


    // Look up user
    const user = await db.oneOrNone(      
      'SELECT * FROM users WHERE username = $1 OR email = $2', 
      [username, email]
    );

    // If username does exist → show error
    if (user) {
      return res.render('pages/register', { 
        error: true,
        message: 'Username/email already exist'
      });
    }
    


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

// app.post('/login', async (req, res) => {
//   try {
//     const {username, password} = req.body;
//     const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
//     if(!user) {
//       return res.redirect('/register');
//     }
//     const match = await bcrypt.compare(password, user.password);
//     if(!match) {
//       return res.render('pages/login', { message: 'Invalid username or password', error: true });
//     }
//     req.session.user = user;
//     req.session.save(() => {
//       res.redirect('/discover');
//     });
//   } catch (error) {
//     console.log('login error', error);
//     //alert("Invalid username or password");
//     //document.getElementById("errorMessage").innerText = "Username is taken.";
//     res.redirect('/login');
//   }
// });

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // capture login / password

    // Look up user
    const user = await db.oneOrNone(      
      'SELECT * FROM users WHERE username = $1', 
      [username]
    );

    // If username doesn't exist → show error
    if (!user) {
      return res.render('pages/login', { 
        error: true,
        message: 'Invalid username or password'
      });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);

    // If password is wrong → show error
    if (!match) {
      return res.render('pages/login', { 
        error: true,
        message: 'Invalid username or password'
      });
    }

    // Password OK → log in
    req.session.user = user;
    req.session.save(() => {
      res.redirect('/discover');
    });

  } catch (error) {
    console.log('login error', error);
    return res.render('pages/login', { 
      error: true,
      message: 'Server error. Please try again later.'
    });
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

app.get('/friends', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const current = req.session.user.username;

  const friends = await db.any(
    `
      SELECT DISTINCT ON (u.username)
             u.username,
             u.email,
             u.institution
      FROM friendList f
      JOIN users u
        ON u.username = CASE
                          WHEN f.user_username = $1 THEN f.friend_username
                          ELSE f.user_username
                        END
      WHERE f.user_username = $1
      ORDER BY u.username
    `,
    [current]
  );

  let searchResults = [];
  if (req.query.query) {
    const term = `%${req.query.query}%`;
    searchResults = await db.any(
      `
        SELECT username, email, institution
        FROM users u
        WHERE (u.username ILIKE $1 OR u.email ILIKE $1)
          AND u.username <> $2
          AND NOT EXISTS (
            SELECT 1
            FROM friendList f
            WHERE (f.user_username = $2 AND f.friend_username = u.username)
               OR (f.friend_username = $2 AND f.user_username = u.username)
          )
      `,
      [term, current]
    );
  }

  res.render('pages/friends', { 
    friends, 
    searchResults 
  });
});

// Add a friend
app.post('/friends/add', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const current = req.session.user.username;
  const target = req.body.username;

  if (!target || target === current) return res.redirect('/friends');

  const exists = await db.one(
    `
      SELECT COUNT(*) AS count
      FROM friendList
      WHERE (user_username = $1 AND friend_username = $2)
         OR (user_username = $2 AND friend_username = $1)
    `,
    [current, target]
  );

  if (Number(exists.count) === 0) {
    await db.none(
      'INSERT INTO friendList (user_username, friend_username) VALUES ($1, $2)',
      [current, target]
    );
    await db.none(
      'INSERT INTO friendList (user_username, friend_username) VALUES ($1, $2)',
      [target, current]
    );
  }

  res.redirect('/friends');
});

// Remove a friend
app.post('/friends/remove', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const current = req.session.user.username;
  const target = req.body.friendUsername;

  if (target) {
    await db.none(
      `
        DELETE FROM friendList
        WHERE (user_username = $1 AND friend_username = $2)
           OR (user_username = $2 AND friend_username = $1)
      `,
      [current, target]
    );
  }

  res.redirect('/friends');
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


// Remove assignment assignment_friends -> then maybe from assignment
// app.get('/removeAssignment', async (req, res) => { // 
//   try {
//     // Look up assignment
//     const assignmentName = await db.oneOrNone('SELECT * FROM assignments WHERE name = $1', 
//     [assignmentRequest]);

//     // No Assignment with given Name
//     if (!assignmentName) {
//       return res.render('/calendar', {error: true, message: 'Invalid Assignment'});
//     }
    
//     // Look up current user info
//     currentUser = req.session.user.username;

//     // delete the entry from assignment_friends
//     await db.none('DELETE FROM assignment_friends WHERE assignment_name = $1 AND user_username = $2',
//     [assignmentName.name, currentUser]);

//     // Look up the count of assignment in assignment_friends
//     const entryCount = await db.oneOrNone('SELECT COUNT(*) FROM assignment_friends WHERE assignment_name = $1;',
//     [assignmentName.name]);
    
//     // Deleted assignment in assignment if..-> All the assignmented deleted in assignment_friends
//     if(entryCount.count == "0")
//     {
//       const entryEvent = await db.none('DELETE FROM assignments WHERE name = $1',
//       [assignmentName.name]);
//     }

//   } catch (error) {
//     console.log(error);
//     res.redirect('/calendar');
//   }
// });
// *****************************************************
// <!-- Section 5 : Start Server -->
// *****************************************************
const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





