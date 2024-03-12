const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const toDoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearBtn = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos;

runEvents();
function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoUI);
  clearBtn.addEventListener("click", removeAllTodos);
  filterInput.addEventListener("keyup", filter);
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todLists = document.querySelectorAll(".list-group-item");
  if (todLists.length > 0) {
    todLists.forEach((todo) => {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display:block");
      } else {
        todo.setAttribute("style", "display:none !important");
      }
    });
  } else {
    showAlert("warning", "There is nothing to filter this section! ");
  }
  

}
function removeAllTodos() {
  const li = document.querySelectorAll(".list-group-item");
  if (li.length > 0) {
    li.forEach((el) => {
      el.remove();
    });
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));

    showAlert("success", "Your request has been deleted! ");
  } else {
    showAlert("warning", "Youe haven't any todo in your list! ");
  }
  
}

function removeTodoUI(e) {
  if (e.target.className === "fa fa-remove") {
    // Remove from UI

    const todo = e.target.parentElement.parentElement;
    todo.remove();

    // Remove from LocalStorage
    removeTodoStorage(todo.textContent);
    showAlert("success", "Your request has been deleted! ");
  }
  
}

function removeTodoStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach((todo) => {
    addTodoUI(todo);
  });
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText === "" || inputText === null) {
    showAlert("danger", "Please insert you todo! ");
  } else {
    addTodoUI(inputText);
    addToLocalStorage(inputText);
    showAlert("success", "Your to-do already added! ");
  }
  // add to UI

  // add ti Localstorage

  e.preventDefault();
}

function addTodoUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;
  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";
  const icon = document.createElement("i");
  icon.className = "fa fa-remove";

  a.appendChild(icon);
  li.appendChild(a);
  toDoList.appendChild(li);
  addInput.value = "";
}

function addToLocalStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, massage) {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = massage;

  firstCardBody.appendChild(div);

  setTimeout((params) => {
    div.remove();
  }, 2000);
}
