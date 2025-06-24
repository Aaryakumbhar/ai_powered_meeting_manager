-- USERS table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- MEETINGS table
CREATE TABLE meetings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  meeting_date DATE
);

-- TASKS table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT,
  assigned_to INT REFERENCES users(id),
  meeting_id INT REFERENCES meetings(id),
  due_date DATE,
  status TEXT DEFAULT 'pending'
);
