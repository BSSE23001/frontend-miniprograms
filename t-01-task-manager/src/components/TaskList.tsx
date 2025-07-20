import type { Task } from "../types"
import TaskItem from "./TaskItem";

type Props = {
    tasks: Task[];
    onToggle: (id: number) => void;
}

export default function TaskList({tasks, onToggle} : Props) {
    return (
        <div>
        {tasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} />
        ))}
        </div>
    );
}