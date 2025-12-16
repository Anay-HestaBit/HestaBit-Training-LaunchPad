const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = [];

function loadTodos() {
  try {
    const stored = localStorage.getItem('todos');
    todos = stored ? JSON.parse(stored) : [];
  } catch {
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span>${todo}</span>
      <div>
        <button data-action="edit" data-index="${index}">Edit</button>
        <button data-action="delete" data-index="${index}">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  todos.push(value);
  saveTodos();
  renderTodos();

  input.value = '';
});

list.addEventListener('click', (e) => {
  const { action, index } = e.target.dataset;
  if (!action) return;

  if (action === 'delete') {
    todos.splice(index, 1);
  }

  if (action === 'edit') {
    const updated = prompt('Edit todo:', todos[index]);
    if (updated && updated.trim()) {
      todos[index] = updated.trim();
    }
  }

  saveTodos();
  renderTodos();
});

loadTodos();
renderTodos();
