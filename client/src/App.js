import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const [newTask, setNewTask] = useState({
    description: '',
    assigned_to: '',
    meeting_id: '',
    due_date: ''
  });

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => {
        console.error("Error fetching tasks:", error);
        setError("❌ Failed to fetch tasks.");
      });
  };

  // Handle task form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", newTask);
      setNewTask({ description: '', assigned_to: '', meeting_id: '', due_date: '' });
      fetchTasks(); // Reload task list
    } catch (err) {
      console.error("Error creating task:", err);
      setError("❌ Failed to create task.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>📋 Meeting Tasks</h1>

      {/* Form to create new task */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="User ID"
          value={newTask.assigned_to}
          onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Meeting ID"
          value={newTask.meeting_id}
          onChange={(e) => setNewTask({ ...newTask, meeting_id: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="date"
          value={newTask.due_date}
          onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Error Display */}
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.description}</strong> — Status: <em>{task.status}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
