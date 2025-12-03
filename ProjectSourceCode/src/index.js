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
  helpers: {
    // Equality check helper (you already had this)
    eq: function(a, b) {
      return a === b;
    },

    // Format date as YYYY-MM-DD
    formatDate: function(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    },

    // Optional: format time as HH:MM
    formatTime: function(time) {
      if (!time) return '';
      const t = new Date(`1970-01-01T${time}Z`);
      return t.toTimeString().slice(0, 5); // "HH:MM"
    }
  }
});

// Register Handlebars helper for equality check
hbs.handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

hbs.handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

// database configuration
const dbConfig = {
  host: process.env.POSTGRES_HOST || 'dpg-d4fppdshg0os73civju0-a', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB || 'users_db_z1ec', // the database name
  user: process.env.POSTGRES_USER || 'users_db_z1ec_user', // the user account to connect with
  password: process.env.POSTGRES_PASSWORD || 'users_db_z1ec_user', // the password of the user account
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
  res.render('pages/register.hbs', {
    title: 'Register - StudyBuddie',
    user: null
  })
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
  res.render('pages/login.hbs', {
    title: 'Login - StudyBuddie',
    user: null,
    layout: false
  })
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

/*app.post('/login', async (req, res) => {
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
      res.redirect('/dashboard');
    });

  } catch (error) {
    console.log('login error', error);
    return res.render('pages/login', { 
      error: true,
      message: 'Server error. Please try again later.'
    });
  }
});*/
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

    // Password OK → start login logic
    req.session.user = user;

    // --- Get today's date (YYYY-MM-DD) ---
    const today = new Date().toLocaleDateString("sv");           // '2025-11-26'
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("sv");

    // Extract values (handle undefined/null cases)
    let lastlogin = req.session.user.lastlogin || null;   // may be null
    let streak = req.session.user.streak || 0;            // default to 0 if undefined

    // --- CASE 1: First login ever ---
    if (lastlogin === null || lastlogin === undefined) {
        streak = 1;
    }
    // --- CASE 2: Already logged in today ---
    else if (lastlogin === today) {
        // streak stays the same
    }
    // --- CASE 3: Logged in yesterday → increment streak ---
    else if (lastlogin === yesterday) {
        streak = (streak || 0) + 1;
    }
    // --- CASE 4: Missed one or more days ---
    else {
        streak = 1;
    }

    // --- Update database row (with error handling) ---
    try {
      await db.none(
        `UPDATE users 
         SET lastlogin = $1, streak = $2
         WHERE username = $3`,
        [today, streak, req.session.user.username]
      );
      
      // --- Update the session copy ---
      req.session.user.lastlogin = today;
      req.session.user.streak = streak;
    } catch (dbError) {
      // If columns don't exist, log but don't fail login
      console.error('Error updating login streak:', dbError.message);
      // Continue with login even if streak update fails
    }

    // Continue login success response
    req.session.save(() => {
      res.redirect('/calendar');
    });

  } catch (error) {
    console.error('Login error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      body: req.body
    });
    return res.render('pages/login', { 
      error: true,
      message: 'Server error. Please try again later.'
    });
  }
});

// Homepage route - accessible without authentication
app.get('/', (req, res) => {
  res.render('pages/homepage.hbs', {
    title: 'StudyBuddie - Your Study Companion',
    user: req.session.user
  });
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

app.use(auth);

// Discover route - redirects to dashboard
app.get('/discover', (req, res) => {
  res.redirect('/dashboard');
});

// Dashboard route - shows user's personal homepage
app.get('/dashboard', async (req, res) => {
  try {
    const username = req.session.user.username;
    
    // Get user's assignments
    const assignments = await db.any(`
      SELECT a.name, a.description, a.course, a.due_at, a.points, a.is_group
      FROM assignments a
      INNER JOIN assignment_friends af ON a.name = af.assignment_name
      WHERE af.user_username = $1
      AND a.due_at > NOW()
      ORDER BY a.due_at ASC
      LIMIT 10
    `, [username]);

    // Format assignments with priority and due date
    const formattedAssignments = assignments.map(assignment => {
      const dueDate = new Date(assignment.due_at);
      const now = new Date();
      const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
      
      let dueDateText;
      if (daysUntilDue === 0) {
        dueDateText = 'Today';
      } else if (daysUntilDue === 1) {
        dueDateText = 'Tomorrow';
      } else {
        dueDateText = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }

      // Determine priority based on days until due
      let priority = 'low';
      if (daysUntilDue <= 1) {
        priority = 'high';
      } else if (daysUntilDue <= 3) {
        priority = 'medium';
      }

      return {
        name: assignment.name,
        course: assignment.course || 'No Course',
        dueDate: dueDateText,
        priority: priority,
        description: assignment.description
      };
    });

    // Get friend count (study groups approximation)
    const friendCount = await db.oneOrNone(`
      SELECT COUNT(*) as count
      FROM friendList
      WHERE user_username = $1
    `, [username]);

    // Get total assignments count
    const activeAssignments = await db.oneOrNone(`
      SELECT COUNT(*) as count
      FROM assignments a
      INNER JOIN assignment_friends af ON a.name = af.assignment_name
      WHERE af.user_username = $1
      AND a.due_at > NOW()
    `, [username]);

    // Mock study groups (you can create a study_groups table later)
    const studyGroups = await db.any(`
      SELECT sg.*,
        COUNT(sgm.username) AS participate
      FROM study_groups sg
      LEFT JOIN study_group_members sgm ON sg.id = sgm.group_id
      WHERE sg.host_username = $1 OR sgm.username = $1
      GROUP BY sg.id
      ORDER BY sg.date ASC
      LIMIT 5
    `, [username]);

    // make sure user object has streak value (default to 0 if undefined)
    const userWithStreak = {
      ...req.session.user,
      streak: req.session.user.streak || 0
    };

    res.render('pages/dashboard.hbs', {
      title: 'Dashboard - StudyBuddie',
      user: userWithStreak,
      currentPage: 'dashboard',
      assignments: formattedAssignments,
      activeAssignmentsCount: activeAssignments ? parseInt(activeAssignments.count) : 0,
      studyGroupsCount: studyGroups.length,
      studyGroups: studyGroups,
      goalsCompleted: 12, // Mock data for now
      weeklyProgress: '+25%' // Mock data for now
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.render('pages/dashboard.hbs', {
      title: 'Dashboard - StudyBuddie',
      user: req.session.user,
      currentPage: 'dashboard',
      assignments: [],
      activeAssignmentsCount: 0,
      studyGroupsCount: 0,
      studyGroups: [],
      goalsCompleted: 0,
      weeklyProgress: '0%'
    });
  }
});

app.get('/calendar', async (req, res) => {
  try {
    const events = await db.any(`
      SELECT * FROM calendar_events 
      ORDER BY event_date ASC, start_time ASC
    `);
    res.render('pages/calendar.hbs', {
      title: 'Calendar',
      user: req.session.user,
      currentPage: 'calendar',
      events: events || []
    });
  } catch (error) {
    console.error('Calendar error:', error);
    // Render calendar with empty events if table doesn't exist or query fails
    res.render('pages/calendar.hbs', {
      title: 'Calendar',
      user: req.session.user,
      currentPage: 'calendar',
      events: []
    });
  }
});

app.post("/calendar/new", async (req, res) => {
  try {
    const {
      title,
      description,
      event_date,
      start_time,
      end_time,
      type       // "study_group" or "assignment"
    } = req.body;

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: "Not logged in" });
    }

    let sourceId = null;

    // -----------------------------
    // 1) If the user created a STUDY GROUP from the calendar,
    //    create a matching study_groups row and store its ID
    // -----------------------------
    if (type === "study_group") {
      const newGroup = await db.one(`
        INSERT INTO study_groups
          (name, category, date, start_time, end_time, max_participants, host_username)
        VALUES
          ($1, $2, $3, $4, $5, 5, $6)
        RETURNING id;
        `,
        [
          title,
          description || "General Study Group",
          event_date,
          start_time,
          end_time,
          user.username
        ]
      );

      sourceId = newGroup.id; // link calendar event to this study group
    }

    // -----------------------------
    // 2) Insert CALENDAR EVENT (works for both study groups and assignments)
    // -----------------------------
    const newEvent = await db.one(
      `
      INSERT INTO calendar_events
        (title, description, event_date, start_time, end_time, source_type, source_id)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
      `,
      [
        title,
        description,
        event_date,
        start_time,
        end_time,
        type,       // "study_group" or "assignment"
        sourceId    // will be null for assignments, set for study groups
      ]
    );

    res.json({
      success: true,
      message: "Event created and synced.",
      event: newEvent,
      studyGroup: sourceId ? {
        id: sourceId,
        name: title,
        category: description || "General Study Group",
        date: event_date,
        start_time,
        end_time,
        max_participants: 5,
        host_username: user.username
      } : null
    });


  } catch (error) {
    console.error("Error creating calendar event:", error);
    res.status(500).json({ error: "Failed to create calendar event" });
  }
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
    title: 'Friends - StudyBuddie',
    user: req.session.user,
    currentPage: 'friends',
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
  res.render('pages/game.hbs', {
    title: 'Game',
    user: req.session.user,
    currentPage: 'game'
  }) // ! Game Page still needs to get added
});

// Add buddies route - redirects to friends
app.get('/add-buddies', (req, res) => {
  res.redirect('/friends');
});

// app.get('/study-groups', (req, res) => {
//   res.render('pages/study-groups.hbs', {
//     title: 'Study Groups - StudyBuddie',
//     user: req.session.user,
//     currentPage: 'study-groups'
//   });
// });

app.get('/study-groups', async (req, res) => {
  try {
    const username = req.session.user.username;

    const studyGroups = await db.any(`
      SELECT
        sg.id,
        sg.name,
        sg.category,
        sg.date,
        sg.start_time,
        sg.end_time,
        sg.host_username,
        sg.max_participants,
        COUNT(sgm.username) AS current_participants
      FROM study_groups sg
      LEFT JOIN study_group_members sgm ON sg.id = sgm.group_id
      GROUP BY sg.id
      ORDER BY sg.date ASC, sg.start_time ASC;
      `);

      res.render('pages/study-groups.hbs', {
        title: 'Study Groups - StudyBuddie',
        user: req.session.user,
        currentPage: 'study-groups',
        studyGroups: studyGroups
      });
  } catch (err) {
    console.error('Error fetching study groups:', err);
    res.status(500).json({ success: false, message: 'Error fetching study groups' });
  }
});

app.post('/study-groups/create', async (req, res) => {
  try {
    const { name, category, date, start_time, end_time, max_participants, members } = req.body;
    const host_username = req.session.user.username;

    const insertGroupQuery = `
      INSERT INTO study_groups (name, category, date, start_time, end_time, host_username, max_participants)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    const groupResult = await db.one(insertGroupQuery, [name, category, date, start_time, end_time, host_username, max_participants]);

    // Insert members into study_group_members table
    if (members && Array.isArray(members)) {
      for (const m of members) {
        await db.none(
          `INSERT INTO study_group_members (group_id, username) VALUES ($1, $2)`,
          [groupResult.id, m]
        );
      }
    }

    await db.none(`
      INSERT INTO calendar_events 
      (title, description, event_date, start_time, end_time, source_type, source_id)
      VALUES ($1, $2, $3, $4, $5, 'study_group', $6)`,
    [name, `Study group for ${category}`, date, start_time, end_time, groupResult.id]
    );

    res.status(200).json({ success: true, message: 'Study group created successfully' });
  } catch (err) {
    console.error('Error creating study group:', err);
    res.status(500).json({ success: false, message: 'Error creating study group' });
  }
});

app.get('/study-groups/:id', async (req, res) => {
  const groupId = req.params.id;
  const group = await db.oneOrNone('SELECT * FROM study_groups WHERE id = $1', [groupId]);
  if (!group) {
    return res.status(404).send('Study group not found');
  }
  res.json(group);
});

app.put('/study-groups/edit/:id', async (req, res) => {
  const groupId = req.params.id;
  const { name, category, date, start_time, end_time, max_participants } = req.body;
  const username = req.session.user.username;
  // Ensure only host can edit
  const group = await db.oneOrNone('SELECT * FROM study_groups WHERE id = $1 AND host_username = $2', [groupId, username]);
  if(!group || group.host_username !== username) { 
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  await db.none(`
    UPDATE study_groups
    SET name = $1, category = $2, date = $3, start_time = $4, end_time = $5, max_participants = $6
    WHERE id = $7`, [name, category, date, start_time, end_time, max_participants, groupId]
  );

  await db.none(`
    UPDATE calendar_events
    SET title = $1, description = $2, event_date = $3, start_time = $4, end_time = $5
    WHERE source_type = 'study_group' AND source_id = $6`,
    [name, `Study group for ${category}`, date, start_time, end_time, groupId]);
  res.json({ success: true, message: 'Study group updated successfully' });
});

app.delete('/study-groups/delete/:id', async (req, res) => {
  const groupId = req.params.id;
  const username = req.session.user.username;
  
  try {
    const group = await db.oneOrNone('SELECT * FROM study_groups WHERE id = $1 AND host_username = $2', [groupId, username]);

    if (!group) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (group.host_username !== username) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    //Delete the group (will also delete members due to ON DELETE CASCADE)
    await db.none('DELETE FROM study_groups WHERE id = $1', [groupId]);
    await db.none(`
      DELETE FROM calendar_events 
      WHERE source_type = 'study_group' 
      AND source_id = $1`, 
      [groupId]);
    res.json({ success: true, message: 'Study group deleted successfully' });
  } catch (err) {
    console.error('Error deleting study group:', err);
    res.status(500).json({ success: false, message: 'Error deleting study group' });
  }
});


app.get('/assignments', async (req, res) => {
  try {
    const username = req.session.user.username;
    
    // Get user's assignments
    const assignments = await db.any(`
      SELECT a.name, a.description, a.course, a.due_at, a.points, a.is_group
      FROM assignments a
      INNER JOIN assignment_friends af ON a.name = af.assignment_name
      WHERE af.user_username = $1
      ORDER BY a.due_at ASC
    `, [username]);

    // Format assignments with priority and due date
    const formattedAssignments = assignments.map(assignment => {
      // Handle null due_at
      if (!assignment.due_at) {
        return {
          name: assignment.name,
          course: assignment.course || 'No Course',
          dueDate: 'No due date',
          priority: 'low',
          description: assignment.description
        };
      }

      const dueDate = new Date(assignment.due_at);
      const now = new Date();
      const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
      
      let dueDateText;
      if (daysUntilDue === 0) {
        dueDateText = 'Today';
      } else if (daysUntilDue === 1) {
        dueDateText = 'Tomorrow';
      } else if (daysUntilDue < 0) {
        dueDateText = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } else {
        dueDateText = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }

      // Determine priority based on days until due
      let priority = 'low';
      if (daysUntilDue < 0) {
        priority = 'high'; // Overdue
      } else if (daysUntilDue <= 1) {
        priority = 'high';
      } else if (daysUntilDue <= 3) {
        priority = 'medium';
      }

      return {
        name: assignment.name,
        course: assignment.course || 'No Course',
        dueDate: dueDateText,
        priority: priority,
        description: assignment.description
      };
    });

    res.render('pages/assignments.hbs', {
      title: 'Assignments - StudyBuddie',
      user: req.session.user,
      currentPage: 'assignments',
      assignments: formattedAssignments
    });
  } catch (error) {
    console.error('Assignments error:', error);
    res.render('pages/assignments.hbs', {
      title: 'Assignments - StudyBuddie',
      user: req.session.user,
      currentPage: 'assignments',
      assignments: []
    });
  }
});

// Profile page
app.get('/profile', async (req, res) => {
  try {
    if (!req.session.user) {
      console.log('Profile: No user session, redirecting to login');
      return res.redirect('/login');
    }
    
    const username = req.session.user.username;
    console.log('Profile: Loading profile for user:', username);
    
    // Get user data with bio and profile_picture (handle case where columns don't exist yet)
    let user;
    try {
      user = await db.oneOrNone(`
        SELECT username, email, institution, 
               COALESCE(bio, '') as bio, 
               COALESCE(profile_picture, '') as profile_picture
        FROM users 
        WHERE username = $1
      `, [username]);
    } catch (dbError) {
      console.log('Profile: Bio/picture columns may not exist, using basic query');
      // If columns don't exist, just get basic user info
      user = await db.oneOrNone(`
        SELECT username, email, institution
        FROM users 
        WHERE username = $1
      `, [username]);
      if (user) {
        user.bio = '';
        user.profile_picture = '';
      }
    }
    
    if (user) {
      console.log('Profile: Rendering profile page for:', username);
      res.render('pages/profile.hbs', {
        title: 'Profile - StudyBuddie',
        user: user,
        currentPage: 'profile'
      });
    } else {
      console.log('Profile: User not found, redirecting to dashboard');
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.redirect('/dashboard');
  }
});

// Update bio route
app.post('/profile/bio', async (req, res) => {
  try {
    const username = req.session.user.username;
    const { bio } = req.body;
    
    // Check if bio column exists, if not we'll handle it gracefully
    await db.none(`
      UPDATE users 
      SET bio = $1 
      WHERE username = $2
    `, [bio || '', username]);
    
    // Update session
    req.session.user.bio = bio || '';
    
    res.json({ success: true });
  } catch (error) {
    console.error('Bio update error:', error);
    // If column doesn't exist, we'll need to add it
    if (error.message.includes('column "bio" does not exist')) {
      try {
        await db.none('ALTER TABLE users ADD COLUMN bio TEXT');
        await db.none('UPDATE users SET bio = $1 WHERE username = $2', [req.body.bio || '', req.session.user.username]);
        req.session.user.bio = req.body.bio || '';
        res.json({ success: true });
      } catch (alterError) {
        console.error('Alter table error:', alterError);
        res.json({ success: false, message: 'Database error' });
      }
    } else {
      res.json({ success: false, message: error.message });
    }
  }
});

// Update profile picture route (using base64 for simplicity)
app.post('/profile/picture', async (req, res) => {
  try {
    const username = req.session.user.username;
    const { imageData } = req.body; // Expecting base64 image data
    
    if (!imageData) {
      return res.json({ success: false, message: 'No image data provided' });
    }
    
    // Check if profile_picture column exists, if not add it
    try {
      await db.none(`
        UPDATE users 
        SET profile_picture = $1 
        WHERE username = $2
      `, [imageData, username]);
    } catch (error) {
      if (error.message.includes('column "profile_picture" does not exist')) {
        await db.none('ALTER TABLE users ADD COLUMN profile_picture TEXT');
        await db.none('UPDATE users SET profile_picture = $1 WHERE username = $2', 
          [imageData, username]);
      } else {
        throw error;
      }
    }
    
    // Update session
    req.session.user.profile_picture = imageData;
    
    res.json({ success: true, message: 'Profile picture updated' });
  } catch (error) {
    console.error('Profile picture update error:', error);
    res.json({ success: false, message: error.message });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.error('Error during logout:', err);
      return res.redirect('/login');
    }
    res.redirect('/login');
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

// Remove assignment assignment_friends -> then maybe from assignment
app.get('/removeAssignment', async (req, res) => { // 
  try {

    let assignmentRequest = req.query.name;
    // Look up assignment
    const assignmentRow = await db.oneOrNone('SELECT * FROM assignments WHERE name = $1', 
    [assignmentRequest]);

    // No Assignment with given Name
    if (!assignmentRow) {
      return res.render('/calendar', {error: true, message: 'Invalid Assignment'});
    }

    // Look up current user info
    const currentUser = req.session.user.username;

    // delete the entry from assignment_friends
    await db.none('DELETE FROM assignment_friends WHERE assignment_name = $1 AND user_username = $2',
    [assignmentRow.name, currentUser]);

    // Look up the count of assignment in assignment_friends
    const entryCount = await db.one('SELECT COUNT(*) AS count FROM assignment_friends WHERE assignment_name = $1;',
    [assignmentRow.name]);

    // Deleted assignment in assignment if..-> All the assignmented deleted in assignment_friends
    if(entryCount.count == "0")
    {
      const entryEvent = await db.none('DELETE FROM assignments WHERE name = $1',
      [assignmentRow.name]);
    }

    return res.redirect('/calendar');

  } catch (error) {
    console.log(error);
    res.redirect('/calendar');
  }
});

// add_assignment
app.post('/add_assignment', async (req, res) => {
  console.log("POST /add_assignment BODY:", req.body);

  const { name, description, course, due_at, is_group } = req.body;
  const currentUser = req.session.user.username;  // <-- REQUIRED: your logged-in username

  // Validate required fields
  if (!name || !name.trim()) {
    console.error("ERROR: Assignment name is required");
    return res.redirect('/calendar');
  }

  if (!due_at) {
    console.error("ERROR: Assignment due date is required");
    return res.redirect('/calendar');
  }

  try {
    // 1️⃣ Check if assignment already exists
    const existingAssignment = await db.oneOrNone(
      'SELECT * FROM assignments WHERE name = $1',
      [name]
    );

    if (existingAssignment) {
      console.log("Assignment already exists → only linking user");

      // 2️⃣ Insert into assignment_friends (if not already linked)
      await db.none(
        `INSERT INTO assignment_friends (assignment_name, user_username)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [name, currentUser]
      );

    } else {
      console.log("Assignment does NOT exist → inserting into assignments + linking user");

      // 3️⃣ Create new assignment
      await db.none(
        `INSERT INTO assignments (name, description, course, due_at, is_group)
         VALUES ($1, $2, $3, $4, $5)`,
        [name, description, course, due_at, is_group]
      );

      // 4️⃣ Link current user to this new assignment
      await db.none(
        `INSERT INTO assignment_friends (assignment_name, user_username)
         VALUES ($1, $2)`,
        [name, currentUser]
      );
    }

    return res.redirect('/calendar');

  } catch (error) {
    console.error("ERROR in /add_assignment:", error);
    return res.redirect('/calendar');
  }
});