function addSubtask() {
  const subtaskInput = document.getElementById('subtaskInput');
  const subtaskText = subtaskInput.value.trim();
  if (subtaskText === '') return;

  const subtaskList = document.getElementById('subtaskList');
  const li = document.createElement('li');
  li.textContent = subtaskText;
  subtaskList.appendChild(li);

  subtaskInput.value = '';
}