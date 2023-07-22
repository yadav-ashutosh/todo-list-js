let draggedTodoId = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event, todoId) {
  draggedTodoId = todoId;
}

function drop(event, targetListId) {
  event.preventDefault();
  const targetList = document.getElementById(targetListId);
  const targetTodoIndex = todos.findIndex(todo => todo.id === draggedTodoId);

  if (targetTodoIndex !== -1) {
    // Remove the dragged todo from the original list
    todos.splice(targetTodoIndex, 1);

    // Find the index where the todo should be inserted in the target list
    const indexToInsert = Array.from(targetList.children).findIndex(
      li => li.contains(event.target) || li === event.target
    );

    // Insert the dragged todo into the target list at the calculated index
    if (indexToInsert >= 0) {
      todos.splice(indexToInsert, 0, draggedTodoId);
    } else {
      // If the todo is dropped at the end of the list, push it to the end of the array
      todos.push(draggedTodoId);
    }

    // Re-render the updated todo list
    renderTodoList();
  }
}
