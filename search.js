
document.getElementById('searchInput').addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    searchTodo();
  }
});

function searchTodo() { 
  const searchKeyword = document.getElementById('searchInput').value.toLowerCase();

  // Show the "Add Todo" section
  document.getElementById('addTodoForm').style.display = 'none';

  const filteredTodos = todos.filter(todo => {
    const todoText = todo.text.toLowerCase();
    // Check if the todo text or description contains the search keyword
    return todoText.includes(searchKeyword);
  });

  // Clear the current todo list
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  
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

let sortOption = 'dueDate';
let sortOrder = 'asc';

function sortTodos() {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  const sortOptionSelect = document.getElementById('sortOptionSelect');

  todos.sort((a, b) => {
    let comparison = 0;
    if (sortOption === 'dueDate') {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      comparison = dateA - dateB;
    } else if (sortOption === 'priority') {
     
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    } else {
    
      const textA = a.text.toLowerCase();
      const textB = b.text.toLowerCase();
      if (textA < textB) {
        comparison = -1;
      } else if (textA > textB) {
        comparison = 1;
      }
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  renderTodoList();
}
function filterTodos(filterType) {
    if (filterType === 'date') {
        const dateFilter = document.getElementById('dateFilter').value;
        filteredTasks = todos.filter((todo) => new Date(todo.dueDate) >= new Date(dateFilter));
        renderModifiedList(filteredTasks)
    } else if (filterType === 'category') {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const filteredTodoList = todos.filter((todo) => todo.category === categoryFilter);
        renderModifiedList(filteredTodoList)
    
    } else if (filterType === 'priority') {
        const priorityFilter = document.getElementById('priorityFilter').value;
        const filteredTodoList = todos.filter((todo) => todo.priority === priorityFilter);
        renderModifiedList(filteredTodoList)
    } 
}

function renderModifiedList(ModifiedList) {
  const todoList = document.getElementById('todoList');

  todoList.innerHTML = '';
  backlogList.innerHTML = '';
  const today = new Date();

  ModifiedList.forEach(todo => {
    const li = document.createElement('li');
    const subtaskList = todo.subtasks.map(subtask => `<li>${subtask}</li>`).join('');

    if (todo.editing) {
      
      li.innerHTML = `
        <form onsubmit="saveTodo(${todo.id}, event)">
          <input type="text" value="${todo.text}" required>
          <input type="text" value="${todo.category}" placeholder="Category...">
          <input type="date" value="${todo.dueDate}">
          <select>
            <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low Priority</option>
            <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium Priority</option>
            <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High Priority</option>
          </select>
          <div class="subtasks">
            ${todo.subtasks.map(subtask => `<input type="text" value="${subtask}" required>`).join('')}
            <button type="button" onclick="addSubtaskInput(${todo.id})">Add Subtask</button>
          </div>
          <button type="submit">Save</button>
        </form>
      `;
    } else {
     
      li.innerHTML = `
       <div class="todol">  
      <div>
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleCompleted(${todo.id}, this)">
        <span>${todo.text}</span>
        <span>Due Date: ${todo.dueDate}</span>
        <span>Priority: ${todo.priority}</span>
        <button onclick="editTodo(${todo.id})">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
        </div>        
        <div class="subtask">
        <ul>${subtaskList}</ul>
        </div>
        </div>
      `;
       const today = new Date().toISOString().slice(0, 10);
    if (todo.dueDate === today) {
      showReminder();
    }
    }

    if (todo.editing) {
      const form = li.querySelector('form');
      form.setAttribute('class', 'edit-form');

      const subtasksDiv = li.querySelector('.subtasks');
      subtasksDiv.style.display = 'flex';
      subtasksDiv.style.alignItems = 'center';

      const subtaskInputs = subtasksDiv.querySelectorAll('input[type="text"]');
      subtaskInputs.forEach(input => {
        input.setAttribute('class', 'subtask-input');
      });

      const addSubtaskButton = subtasksDiv.querySelector('button');
      addSubtaskButton.setAttribute('class', 'add-subtask-button');
    }

   
    if (todo.dueDate !== '') {
      if (new Date(todo.dueDate) < today) {
        backlogList.appendChild(li);
      } else {
        todoList.appendChild(li);
      }
    } else {
      todoList.appendChild(li);
    }
  });

}

