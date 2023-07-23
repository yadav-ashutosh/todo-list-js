let todos = [];


function toggleCompleted(todoId, checkbox) {
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    todo.completed = checkbox.checked;
    renderTodoList();
  }
}

function deleteTodo(todoId) {
    const todoToDelete = todos.find(todo => todo.id === todoId);
    const todoText = todoToDelete.text;

    todos = todos.filter(todo => todo.id !== todoId);
    
    const description = `Deleted Todo: ${todoText}`;
    addActivityLogEntry('delete', description);

  renderTodoList();
  renderActivityLog();
}

function editTodo(todoId) {
    const todoToDelete = todos.find(todo => todo.id === todoId);
    const todoText = todoToDelete.text;
  todos.forEach(todo => {
    todo.editing = todo.id === todoId;
  });
  const description = `Edited Todo: ${todoText}`;
  addActivityLogEntry('edit', description);
  renderActivityLog();
  renderTodoList();
}

// Other functions like filtering by due date and category need to be implemented.

// Load todos from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = storedTodos;
  renderTodoList();
});

// Save todos to local storage whenever the todo list changes
window.addEventListener('beforeunload', () => {
  localStorage.setItem('todos', JSON.stringify(todos));
});
