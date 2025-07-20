import type { Task } from "../types";

type Props = {
    task: Task;
    onToggle: (id: number) => void;
}

export default function TaskItem({task, onToggle} : Props) {
    return (
        <div
        onClick={() => onToggle(task.id)}
        style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            cursor: 'pointer',
            margin: '5px 0',
        }}
        >
        {task.text}
        </div>
    );
}