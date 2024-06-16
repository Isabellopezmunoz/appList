// document.getElementById('addTaskBtn').addEventListener('click', addTask)

// function addTask() {
//   const taskInput = document.getElementById('taskInput')
//   const taskText = taskInput.value.trim()

//   if (taskText !== '') {
//       const taskList = document.getElementById('taskList')

//       const li = document.createElement('li')
//       li.textContent = taskText

//       const deleteBtn = document.createElement('button')
//       deleteBtn.textContent = 'Eliminar'

//       deleteBtn.addEventListener('click', function() {
//         taskList.removeChild(li)
//       })

//       li.appendChild(deleteBtn)
//       taskList.appendChild(li)

//       taskInput.value = ''
//   }
// }


document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput')
  const addTaskBtn = document.getElementById('addTaskBtn')
  const taskList = document.getElementById('taskList')

  addTaskBtn.addEventListener('click', addTask)
  taskList.addEventListener('click', handleTaskClick)

  loadTasks()

  function addTask() {
    const taskText = taskInput.value.trim()
    if (taskText === '') return

    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    }

    addTaskToDOM(task)
    saveTask(task)
    taskInput.value = ''
  }

  function handleTaskClick(event) {
    const item = event.target
    const taskElement = item.closest('li')
    const taskId = Number(taskElement.dataset.id)

    if (item.classList.contains('delete')) {
      deleteTask(taskId)
      taskElement.remove()
    } else if (item.classList.contains('toggle')) {
      toggleTask(taskId)
      taskElement.classList.toggle('completed')
    }
  }

  function addTaskToDOM(task) {
    const li = document.createElement('li')
    li.dataset.id = task.id

    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete">Eliminar</button>
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

  function deleteTask(id) {
    let tasks = getTasks()
    tasks = tasks.filter(task => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
})
