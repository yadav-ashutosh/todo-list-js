
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();
  if (todoText === '') return;

  const categoryInput = document.getElementById('categoryInput');
  const category = categoryInput.value.trim();

  const dueDateInput = document.getElementById('dueDateInput');
  const dueDate = dueDateInput.value;

  const prioritySelect = document.getElementById('prioritySelect');
  const priority = prioritySelect.value;

  const subtaskListItems = document.querySelectorAll('#subtaskList li');
  const subtasks = Array.from(subtaskListItems).map(li => li.textContent.trim());

  const newTodo = {
    id: Date.now(), 
    text: todoText,
    category: category,
    dueDate: dueDate,
    priority: priority,
    subtasks: subtasks,
    completed: false,
    editing: false,
  };
  const description = `Added Todo: ${newTodo.text}`;
  addActivityLogEntry('add', description);
  todos.push(newTodo);
  todoInput.value = '';
  categoryInput.value = '';
  dueDateInput.value = '';
  subtaskListItems.forEach(li => li.remove()); // Clear subtasks
  renderTodoList();
  renderActivityLog();
}


function saveTodo(todoId, event) {
  event.preventDefault();
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    const form = event.target;
    const inputs = form.getElementsByTagName('input');
    const select = form.getElementsByTagName('select')[0];
    todo.text = inputs[0].value.trim();
    todo.category = inputs[1].value.trim();
    todo.dueDate = inputs[2].value;
    todo.priority = select.value;
    todo.subtasks = Array.from(inputs).slice(3).map(input => input.value.trim()); // Save subtasks
    todo.editing = false;
    renderTodoList();
  }
}

function addSubtaskInput(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    todo.subtasks.push(''); // Add an empty subtask input
    renderTodoList();
  }
}