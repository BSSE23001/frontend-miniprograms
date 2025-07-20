import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
}