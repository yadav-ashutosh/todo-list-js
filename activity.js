let activityLog = [];

function addActivityLogEntry(action, description) {
  const logEntry = {
    action,
    description,
    timestamp: new Date().toLocaleString(),
  };
  activityLog.push(logEntry);
}

function renderActivityLog() {
  const activityLogList = document.getElementById('activityLog');
  activityLogList.innerHTML = '';

  activityLog.forEach(logEntry => {
    const li = document.createElement('li');
    li.textContent = `[${logEntry.timestamp}] ${logEntry.description}`;
    activityLogList.appendChild(li);
  });
}