import { fetchData, postData, displayTodo } from "./apiCalls.js" 

const inputTodo = document.getElementById('todo')
const display = document.getElementById('todoList')
const enterButton = document.getElementById('enterButton')


// run function whenever the page loads
fetchData(displayTodo)


inputTodo.addEventListener('input', type)
enterButton.addEventListener('click', async () => {
  await postData(inputTodo.value)
  type()
})


function type() {
  display.textContent = inputTodo.value
}

