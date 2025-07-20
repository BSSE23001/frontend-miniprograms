import { useState } from 'react'
import './App.css'
import type { Task } from './types'
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  const [ tasks, setTasks ] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks((prev: Task[])=> [...prev, newTask]);
  };

  const toggleTask = (id: Number) => {
    setTasks((prev: Task[]) => 
    prev.map((t : Task) => t.id === id ? {...t, completed: !t.completed} : t))
  }

  return (
    <>
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </div>
    </>
  )
}

export default App