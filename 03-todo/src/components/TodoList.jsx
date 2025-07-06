import { useState } from "react";

function TodoList() {
    // All todos will be accumulated in a string
    const [todos, setTodos] = useState([]);

    // New Todo will be a single string
    const [newTodo, setNewTodo] = useState("");

    // The filters will be: 'all' ; 'active' ; 'completed'
    const [filter, setFilter] = useState("all");

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() === "") return;
        const newTodoItem = {
            id: Date.now(),
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo("");
    };

    /**
     *  const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        Note the syntax here
        (todo) => todo.id === id ? ......... -> This is the implicit return
        Below is another syntax with explicit return
        (todo) => {
            return todo.id === id ? ..........
        }
        The same thing happens while using .map and .filter function
     */

    const handleToggleComplete = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handleDeleteTodo = (id) => {
        const remainingTodos = todos.filter((todo) => todo.id !== id);
        setTodos(remainingTodos);
    };

    // Whenever we have some filter machanism in our app
    // the object we let user see is not the actual todos (as for example)
    // instead the object user sees is
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") {
            return !todo.completed;
        } else if (filter === "completed") {
            return todo.completed;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-10 to-slate-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">My Modern Todo List</h1>

            <form onSubmit={handleAddTodo} className="flex gap-3 mb-6 w-full max-w-lg">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    placeholder="What do you need to do?"
                    className="flex-grow rounded-xl border border-slate-300 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r
                    from-slate-700
                    to-slate-900
                    text-white
                    px-6
                    py-2
                    rounded-xl
                    shadow
                    hover:scale-105
                    hover:shadow-lg
                    transition"
                >
                    Add
                </button>
            </form>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-full transition ${filter === "all" ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("active")}
                    className={`px-4 py-2 rounded-full transition ${filter === "active" ? "bg-green-600 text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}`}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`px-4 py-2 rounded-full transition ${filter === "completed" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}`}
                >
                    Completed
                </button>
            </div>

            <div className="w-full max-w-lg space-y-3">
                {filteredTodos.length === 0 && (
                    <div className="text-slate-500 text-center">
                        No todos. Add some to get started!
                    </div>
                )}

                {filteredTodos.map(todo => (
                    <div
                        key={todo.id}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-sm transition cursor-pointer 
                        ${todo.completed ? "bg-green-100 text-green-800 line-through" : "bg-white hover:bg-slate-100"}`}
                        onClick={() => handleToggleComplete(todo.id)}
                    >
                        <span>{todo.text}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTodo(todo.id);
                            }}
                            className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                            title="Delete"
                        >
                            🗑
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
