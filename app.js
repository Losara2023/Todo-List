const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const toDoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearBtn = document.querySelector("#clearButton");
let todos;

runEvents();
function runEvents() {
  form.addEventListener("submit", addTodo);

  function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText === "" || inputText === null) {
      showAlert("danger","Please insert you todo! ")
    
    } else {
      addTodoUI(inputText);
      addToLocalStorage(inputText);
      showAlert("success","Your to-do already added! ");
      
    }
    // add to UI

    // add ti Localstorage

    e.preventDefault();
  }
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
  {/* <div class="alert alert-warning" role="alert">
    This is a warning alert—check it out!
  </div>; */}
  const div = document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent = massage;
   
    firstCardBody.appendChild(div);

  setTimeout((params) => {
    div.remove();
  }
  ,2000)

}
