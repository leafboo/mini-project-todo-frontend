const inputTodo = document.getElementById('todo')
const display = document.getElementById('todoList')
const enterButton = document.getElementById('enterButton')
const todoDataElement = document.getElementById('todoData')

// run function whenever the page loads
fetchData()

inputTodo.addEventListener('input', type)
enterButton.addEventListener('click', () => {
  inputTodo.value = ''
  type()
})

function type() {
  display.textContent = inputTodo.value
}

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5000/todoList')
    const data = await response.json()
    console.log(data)
  } catch(err) {
    console.error(`Error in fetching data: ${err}`)
  }
}
