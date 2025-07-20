import { useState } from 'react';

export default function AddTask({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form className='bg-slate-100 p-5 rounded-2xl' onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
        className='focus:border-b-2 m-2 focus:outline-0'
      />
      <button
      type="submit"
      className='cursor-pointer hover:bg-cyan-400 p-2 rounded-xl outline-2'
      >Add</button>
    </form>
  );
}