// Add an event listener for the search button
document.getElementById('searchInput').addEventListener('keydown', function (event) {
  // Check if the Enter key is pressed (key code 13)
  if (event.keyCode === 13) {
    searchTodo();
  }
});

function searchTodo() {
  const searchKeyword = document.getElementById('searchInput').value.toLowerCase();

  // Show the "Add Todo" section
  document.getElementById('addTodoForm').style.display = 'none';
  // Filter the todos based on the search keyword
  const filteredTodos = todos.filter(todo => {
    const todoText = todo.text.toLowerCase();
    // Check if the todo text or description contains the search keyword
    return todoText.includes(searchKeyword);
  });

  // Clear the current todo list
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  // Render the filtered todo list
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleCompleted(${todo.id}, this)">
      <span>${todo.text}</span>
      <span>Due Date: ${todo.dueDate}</span>
      <span>Priority: ${todo.priority}</span>
      <button onclick="editTodo(${todo.id})">Edit</button>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(li);
  });

  // Clear the search input
  document.getElementById('searchInput').value = '';
}
