const ul = document.querySelector(".todos");
const searchForm = document.querySelector(".search input");
const addForm = document.querySelector(".add");
const li = document.querySelector("li");

// function that will inject string to the ul DOM
const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;

  ul.innerHTML += html;
};

// add todo function
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = addForm.add.value.trim();
  if (newTodo.length) {
    generateTemplate(newTodo);
    addForm.reset();
  }
});

// remove todo andcross out semi finished todo function
let ctr = 0;
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  } else if (e.target.tagName === "SPAN" && ctr == 0) {
    e.target.style.textDecoration = "line-through";
    ctr++;
  } else if (e.target.tagName === "SPAN" && ctr == 1) {
    e.target.style.textDecoration = "none";
    ctr--;
  }
});

// function that will filter todos
const filterTodos = (search) => {
  // hide all the data items that do not contains the searched text
  Array.from(ul.children)
    .filter(
      (todo) => !todo.textContent.toLowerCase().includes(search)
    )
    .forEach((item) => item.classList.add("filtered"));

  // unhide all the data items that are hidden before
  Array.from(ul.children)
    .filter((todo) =>
      todo.textContent.toLowerCase().includes(search.toLowerCase())
    )
    .forEach((item) => item.classList.remove("filtered"));
};

// filter todo list
searchForm.addEventListener("keyup", (e) => {
  const search = searchForm.value.trim().toLowerCase();
  filterTodos(search);
});
