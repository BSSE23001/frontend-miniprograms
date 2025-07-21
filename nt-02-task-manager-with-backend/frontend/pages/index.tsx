import { Task } from "@/types";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:4000/api/tasks');
    const data: Task[] = await res.json();
    setTasks(data);
  };

  useEffect(()=> {fetchTasks();},[]);

  const addTask = async (text: string) => {
    await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text})
    });
    fetchTasks();
  };

  const toggleTask = async (id: number) => {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'PUT'
    });
    fetchTasks();
  }

  return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-6 border-2 rounded-3xl bg-gray-50 shadow-2xl text-xl text-blue-950 space-y-5">
        <h1 className="text-center">Task Manager</h1>
        <AddTask onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} />
        </div>
      </div>
  );
};

export default Home;