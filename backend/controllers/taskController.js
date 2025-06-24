const db = require("../db");

// ✅ Create a task
exports.createTask = async (req, res) => {
  const { description, assigned_to, meeting_id, due_date } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO tasks (description, assigned_to, meeting_id, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [description, assigned_to, meeting_id, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting task:", err);
    res.status(500).json({ error: "Something went wrong while creating the task." });
  }
};

// ✅ Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    res.status(500).json({ error: "Something went wrong while fetching tasks." });
  }
};
