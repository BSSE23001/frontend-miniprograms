import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function Home() {
  const [ tasks, setTasks ] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
    prev.map((t) =>
    t.id === id ? {...t, completed: !t.completed} : t));
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 border-2 rounded-3xl bg-gray-50 shadow-2xl text-xl text-blue-950 space-y-5">
      <h1 className="text-center">Task Manager</h1>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
      </div>
    </div>
  );
}
