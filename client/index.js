const inputTodo = document.getElementById('todo')
const display = document.getElementById('todoList')

inputTodo.addEventListener('input', type)


function type() {
  display.textContent = inputTodo.value

}


