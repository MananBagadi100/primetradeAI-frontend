import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "../styles/DashboardStyles.css";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");

    // Fetch tasks on mount
    const fetchTasks = async () => {
        try {
            const res = await axiosInstance.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            console.log("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await axiosInstance.post("/tasks", {
                title,
                description
            });

            setTitle("");
            setDescription("");
            fetchTasks();
        } catch (err) {
            console.log("Error creating task:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.log("Error deleting task:", err);
        }
    };

    // Search filter
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dash-container">
            <div className="dashboard-content-area">
                <h1 className="dash-title">Your Dashboard</h1>

                <div className="task-form-card">
                    <h2 className="card-title">Add New Task</h2>

                    <form onSubmit={handleCreateTask} className="task-form">
                        <input
                            type="text"
                            placeholder="Task Title"
                            className="input-field"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Task Description (optional)"
                            className="textarea-field"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button type="submit" className="submit-btn">
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="task-list-card">
                    <div className="task-list-header">
                        <h2 className="card-title">Your Tasks</h2>

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="search-field"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="task-list">
                        {filteredTasks.length === 0 ? (
                            <p className="no-tasks">No tasks found...</p>
                        ) : (
                            filteredTasks.map((task) => (
                                <div key={task.id} className="task-card">
                                    <div className="task-info">
                                        <h3 className="task-title">{task.title}</h3>
                                        {task.description && (
                                            <p className="task-desc">{task.description}</p>
                                        )}
                                    </div>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;