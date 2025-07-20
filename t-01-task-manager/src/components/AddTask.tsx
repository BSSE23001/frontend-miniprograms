import { useState } from "react";

type Props = {
    onAdd: (text: string) => void;
}

export default function AddTask(
    { onAdd } : Props
) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!text.trim()) return;
        onAdd(text);
        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
        <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter task"
            style={{margin: 10, padding:10, borderRadius: 10}}
        />
        <button type="submit">Add</button>
        </form>
    );
}
