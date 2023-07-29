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

document.addEventListener('DOMContentLoaded', () => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = storedTodos;
  renderTodoList();
});


window.addEventListener('beforeunload', () => {
  localStorage.setItem('todos', JSON.stringify(todos));
});


