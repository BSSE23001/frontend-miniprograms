export default function TaskItem({ task, onToggle }) {
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