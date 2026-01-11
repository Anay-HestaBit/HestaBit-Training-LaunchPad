import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    const res = await fetch('http://localhost:5000/todos');
    setTodos(await res.json());
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Todo App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
