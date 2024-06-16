document.getElementById('addTaskBtn').addEventListener('click', addTask)

function addTask() {
  const taskInput = document.getElementById('taskInput')
  const taskText = taskInput.value.trim()

  if (taskText !== '') {
      const taskList = document.getElementById('taskList')

      const li = document.createElement('li')
      li.textContent = taskText

      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Eliminar'

      deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li)
      })

      li.appendChild(deleteBtn)
      taskList.appendChild(li)

      taskInput.value = ''
  }
}
