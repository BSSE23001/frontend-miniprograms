import { Router } from "express";
const router = Router();

let tasks = [
    { "id": 1, "text": "Buy milk", "completed": false },
    { "id": 2, "text": "Do Home Work", "completed": false },
    { "id": 3, "text": "Buy Water", "completed": false },
    { "id": 4, "text": "Buy Grocery", "completed": false },
    { "id": 5, "text": "Build MERN App", "completed": false },
    { "id": 6, "text": "Build Flutter App", "completed": false },
    { "id": 7, "text": "Build GenAI App", "completed": false }
];

router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

router.post('/', (req, res) => {
    const { text } = req.body;
    const newTask = {id:Date.now(), text, completed: false};
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  res.sendStatus(204);
});

export default router;