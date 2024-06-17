
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput')
  const daySelect = document.getElementById('daySelect')
  const button = document.getElementById('button')

  button.addEventListener('click', addTask)

  document.querySelectorAll('.task-list').forEach(task => {
    task.addEventListener('click', handleTaskClick)
  })

  loadTasks()

  function addTask(event) {
    event.preventDefault()
    const taskText = taskInput.value.trim()
    const day = daySelect.value

    if (taskText === '') return

    const task = {
      id: Date.now(),
      text: taskText,
      day: day
    }

    addTaskToDOM(task)
    saveTask(task)
    taskInput.value = ''
  }

  function handleTaskClick(event) {
    const item = event.target
    const taskElement = item.closest('li')
    const taskId = Number(taskElement.dataset.id)
    const day = taskElement.closest('.day-card').id

    if (item.classList.contains('delete')) {
      deleteTask(taskId, day)
      taskElement.remove()
    }
  }

  function addTaskToDOM(task) {
    if (!task) return
    const taskList = document.getElementById(task.day).querySelector('.task-list')

    const li = document.createElement('li')
    li.dataset.id = task.id

    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
    `
    taskList.appendChild(li)
}

  function saveTask(task) {
    const tasks = getTasks()
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function loadTasks() {
    const tasks = getTasks()
    tasks.forEach(task => addTaskToDOM(task))
  }

  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
  }

  function deleteTask(id, day) {
    let tasks = getTasks()
    tasks = tasks.filter(task => task.id !== id || task.day !== day)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
})
