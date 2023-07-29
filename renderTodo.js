function renderTodoList() {
  const todoList = document.getElementById('todoList');
  const backlogList = document.getElementById('backlogList');
  todoList.innerHTML = '';
  backlogList.innerHTML = '';
  const today = new Date();

  todos.forEach(todo => {
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










