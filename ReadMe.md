# StudyBuddie

## Project Overview

StudyBuddie is a student-focused productivity application designed to make studying more social and personalized while maintaining efficiency. The platform combines task management, peer interaction, and collaborative learning features in one comprehensive application.

**Key Features:**
- **Calendar Management**: Organize study schedules, track assignments, and manage group meetings
- **Assignment Tracking**: Manage assignments with priorities and due dates
- **Study Groups**: Create and join study sessions with peers
- **Study Streak**: Gamified daily login streak to incentivize consistent studying
- **Friends System**: Connect with study partners and share schedules
- **Dashboard**: Overview of active assignments, study groups, and progress

The application is built using a modern web stack with Node.js, Express, PostgreSQL, and Handlebars templating, all containerized with Docker for easy deployment and development.

## Directory Structure

```
group-project-Abhishrek05/
├── ProjectSourceCode/          # Main application source code
│   ├── src/
│   │   ├── index.js            # Main Express server and route handlers
│   │   ├── init_data/          # SQL initialization scripts for database
│   │   │   ├── 01user.sql      # User table schema
│   │   │   ├── 02assignment.sql # Assignment table schema
│   │   │   ├── 03freindlist.sql # Friends list table schema
│   │   │   ├── 04assignment-friends.sql # Assignment-friends junction table
│   │   │   ├── 05study_groups.sql # Study groups table schema
│   │   │   ├── 06study_group_members.sql # Study group members table
│   │   │   └── 07calendar_events.sql # Calendar events table schema
│   │   ├── public/             # Static assets (CSS, images)
│   │   │   └── css/
│   │   │       └── images/
│   │   │           └── studyBuddie.png
│   │   └── views/              # Handlebars templates
│   │       ├── layouts/        # Base layout templates
│   │       │   └── main.hbs   # Main layout wrapper
│   │       ├── pages/          # Page templates
│   │       │   ├── homepage.hbs
│   │       │   ├── login.hbs
│   │       │   ├── register.hbs
│   │       │   ├── dashboard.hbs
│   │       │   ├── calendar.hbs
│   │       │   ├── assignments.hbs
│   │       │   ├── study-groups.hbs
│   │       │   ├── friends.hbs
│   │       │   └── profile.hbs
│   │       └── partials/       # Reusable template components
│   │           ├── head.hbs    # HTML head section
│   │           └── navbar.hbs  # Navigation bar
│   ├── test/                   # Test files
│   │   └── server.spec.js      # Mocha test suite
│   ├── docker-compose.yaml     # Docker Compose configuration
│   ├── init_db.sh              # Database initialization script
│   └── package.json            # Node.js dependencies and scripts
├── Deliverables/               # Project deliverables documentation
├── MilestoneSubmissions/       # Milestone submission files and screenshots
└── TeamMeetingLogs/            # Team meeting documentation

```

## Run Instructions

### Prerequisites
- Docker and Docker Compose installed
- A `.env` file in the `ProjectSourceCode/` directory with the following variables:
  ```
  POSTGRES_DB=your_database_name
  POSTGRES_USER=your_database_user
  POSTGRES_PASSWORD=your_database_password
  ```

### Running the Application

1. **Navigate to the ProjectSourceCode directory:**
   ```bash
   cd ProjectSourceCode
   ```

2. **Start the application using Docker Compose:**
   ```bash
   docker-compose up
   ```
   This will:
   - Start a PostgreSQL database container
   - Initialize the database with the SQL scripts from `src/init_data/`
   - Start the Node.js web server on port 3000

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

### Development Mode

The application runs with `nodemon` for automatic server restarts during development. To run tests before starting:

```bash
# Edit docker-compose.yaml and change the command to:
command: 'npm run testandrun'
```

Or manually run:
```bash
npm run testandrun
```

### Stopping the Application

Press `Ctrl+C` in the terminal, or run:
```bash
docker-compose down
```

## Deployed Link
https://group-project-abhishrek05.onrender.com
