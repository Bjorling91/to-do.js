//Selectors

const todoInput = document.querySelector('.todo-input');

const todoButton = document.querySelector('.todo-button');

const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener("click", filterTodo);

//functions

function addTodo(event) {
  event.preventDefault();

  //Todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Skapa li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  //Lägger till en todo till localStorage
  saveLocalTodos(todoInput.value);

  //färdig knapp
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);


  //papperskorg knapp
  const trashdButton = document.createElement('button');
  trashdButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashdButton.classList.add('trash-btn');
  todoDiv.appendChild(trashdButton);

  //Append till listan
  todoList.appendChild(todoDiv);

  //rensa todo input value
  todoInput.value = "";

}

function deleteCheck(e) {
  const item = e.target;

  //Ta bort // TODO:
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
      todo.remove();
    })

  }

  //Färdig knapp
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "allt":
        todo.style.display = "flex";
        break;
      case 'completed':
        if (todo.classList.contains("completed")) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }

  });
}

function saveLocalTodos(todo) {
  //Kontroll om det redan finns en likadan todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];

  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];

  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Skapa li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    //färdig knapp
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);


    //papperskorg knapp
    const trashdButton = document.createElement('button');
    trashdButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashdButton.classList.add('trash-btn');
    todoDiv.appendChild(trashdButton);

    //Append till listan
    todoList.appendChild(todoDiv);


  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];

  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));

}