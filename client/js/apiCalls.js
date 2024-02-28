const inputTodo = document.getElementById('todo')
const todoDataElement = document.getElementById('todoData')
let dataTodo = []

async function fetchData(callback) {
  try {
    const response = await fetch('http://localhost:5000/todoList')
    const data = await response.json()
    dataTodo = data.map((todo) => todo)
    callback()
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

async function deleteTodo(todoId) {
  try {
    const response = await fetch(`http://localhost:5000/todoList/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    fetchData(displayTodo)
  } catch(err) {
    console.error('Failed to delete resource:', err);
  }
}

function displayTodo() {
  const todoArray = dataTodo.map((todo) => todo.todo)
  todoDataElement.textContent = ''
  let df = new DocumentFragment()
  dataTodo.forEach((todo) => {
    let div = document.createElement('div')
    div.className = `div-todo`
    df.appendChild(div)

    let span = document.createElement('span')
    span.textContent = todo.todo
    div.appendChild(span)

    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'delete'
    deleteButton.className = `deleteButton delete-${todo.todo}`
    deleteButton.addEventListener('click', async () => { await deleteTodo(todo.id) })
    div.appendChild(deleteButton)

    todoDataElement.appendChild(df)

  })
  console.log(todoArray)

}

export { fetchData, postData, displayTodo }