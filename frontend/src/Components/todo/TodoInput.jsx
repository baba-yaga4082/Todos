

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./TodoInput.css";
import UpdateTask from "./update";
import ViewTask from "./view";
import toast from "react-hot-toast";
import axios from "axios";

const TodoInput = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [todos, setTodos] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showView, setShowView] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

 
    const isLoggedIn = useSelector((state) => state.isloggedin);

    
    const getAuthHeaders = () => {
        const token = sessionStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

   
    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (isLoggedIn && userId) {
            fetchTodos();
        }
        else {
            setTodos([]);
        }
    }, [isLoggedIn]);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/gettasks`, {
                headers: getAuthHeaders()
            });
            console.log("Fetched todos:", res.data.list);
            setTodos(res.data.list);
        } catch (error) {
            console.error("Error fetching todos:", error);
            toast.error("Failed to load todos");
        }
    };

    const click = () => {
        document.getElementById("text-area").style.display = "block";
    };

    const handleAdd = async () => {
        if (!title || !body) {
            toast.error("Please enter title and body");
            return;
        }

        const id = sessionStorage.getItem('userId');

        if (isLoggedIn && id) {
            try {
                const res = await axios.post(
                    'http://localhost:3000/api/addtask',
                    { title, body },
                    { headers: getAuthHeaders() }
                );
                setTodos([...todos, res.data.task]);
                toast.success("Task Added Successfully");
                setTitle("");
                setBody("");
            } catch (error) {
                console.error("Error adding todo:", error);
                toast.error("Failed to add todo");
            }
        } else {
            toast.error("Please SignUp to add tasks");
        }
    };

    const del = async (taskId, index) => {
        const id = sessionStorage.getItem('userId');
       

        if (!id) {
            toast.error("Please login to delete tasks");
            return;
        }

        if (!taskId) {
            toast.error("Invalid task");
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/deletetask/${taskId}`, {
                headers: getAuthHeaders()
            });
            const newTodos = todos.filter((_, i) => i !== index);
            setTodos(newTodos);
            toast.success("Todo Deleted Successfully");
        } catch (error) {
            console.error("Error deleting todo:", error);
            toast.error("Failed to delete todo");
        }
    };

    const openUpdate = (index) => {
        setCurrentIndex(index);
        setShowUpdate(true);
    };

    const openView = (index) => {
        setCurrentIndex(index);
        setShowView(true);
    };

    const closeView = () => {
        setShowView(false);
        setCurrentIndex(null);
    };

    const handleUpdate = async (updatedTask) => {
        const id = sessionStorage.getItem('userId');
        const taskId = todos[currentIndex]?._id;

        if (!id) {
            toast.error("Please login to update tasks");
            return;
        }

        if (!taskId) {
            toast.error("Invalid task");
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:3000/api/updatetask/${taskId}`,
                {
                    title: updatedTask.title,
                    body: updatedTask.body
                },
                {
                    headers: getAuthHeaders()
                }
            );

            const newTodos = [...todos];
            newTodos[currentIndex] = res.data.task;
            setTodos(newTodos);
            setShowUpdate(false);
            toast.success("Task Updated Successfully");
        } catch (error) {
            console.error("Error updating todo:", error);
            toast.error("Failed to update todo");
        }
    };

    const closeUpdate = () => {
        setShowUpdate(false);
        setCurrentIndex(null);
    };

    return (
        <div className="todo-wrapper">
            <div className="todo-card">
                <input
                    type="text"
                    placeholder="TITLE"
                    value={title}
                    onClick={click}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="ENTER YOUR TASK"
                    id="text-area"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>

            <button className="add-btn" onClick={handleAdd}>
                Add
            </button>

            <div className="todo-list">
                {todos && todos.length > 0 ? (
                    todos.map((e, index) => (
                        e && e.title ? (
                            <div className="todo-card" key={e._id || index}>
                                <h3 className="todo-title">{e.title}</h3>
                                <p className="todo-body">
                                    {e.body && e.body.length > 50
                                        ? e.body.substring(0, 50) + "..."
                                        : e.body}
                                </p>
                                <div className="todo-actions">
                                    <button
                                        className="icon-btn view"
                                        onClick={() => openView(index)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="icon-btn edit"
                                        onClick={() => openUpdate(index)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="icon-btn delete"
                                        onClick={() => del(e._id, index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ) : null
                    ))
                ) : (
                    <p className="no-todos">No todos yet. Add one above!</p>
                )}
            </div>

            {showUpdate && todos[currentIndex] && (
                <UpdateTask
                    task={todos[currentIndex]}
                    onUpdate={handleUpdate}
                    onClose={closeUpdate}
                />
            )}

            {showView && todos[currentIndex] && (
                <ViewTask
                    task={todos[currentIndex]}
                    onClose={closeView}
                />
            )}
        </div>
    );
};

export default TodoInput;