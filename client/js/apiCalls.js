const inputTodo = document.getElementById('todo')
const todoDataElement = document.getElementById('todoData')

async function fetchData(callback) {
  try {
    const response = await fetch('http://localhost:5000/todoList')
    const data = await response.json()
    const dataTodo = data.map((todo) => todo.todo)
    console.log(dataTodo)
    callback(dataTodo)
  } catch(err) {
    console.error(`Error in fetching data: ${err}`)
  }
}

async function postData() {
  try {
    const todoBody = {
      todo: inputTodo.value
    }
    await fetch('http://localhost:5000/todoList', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoBody)
    })
    fetchData(displayTodo)
  } catch(err) {
    console.error(err)
  }
}

function displayTodo(dataTodo) {
  todoDataElement.textContent = ''
  let df = new DocumentFragment()
  dataTodo.forEach((todo) => {
  let div = document.createElement('div')
  df.appendChild(div)

  let span = document.createElement('span')
  span.textContent = todo
  div.appendChild(span)

  todoDataElement.appendChild(df)
})
}

export { fetchData, postData, displayTodo }