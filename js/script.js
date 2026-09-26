let tasks = [];
let currentFilter = "all";

//Загруза из LocalStorege
function loadState() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    [
      { id: crypto.randomUUID(), text: "Изучить JavaScript", done: false },
      { id: crypto.randomUUID(), text: "Сделать To-Do", done: true },
      { id: crypto.randomUUID(), text: "Залить на GitHub", done: false },
    ];
  }
  const savedFilter = localStorage.getItem("filter");
  if (savedFilter) {
    currentFilter = savedFilter;
  }
}
// Сохранение в LocalStorege
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("filter", currentFilter);
}

//Подстветка активного фильтра
function updateActiveFilter() {
  document.querySelectorAll(".app__filter").forEach((btn) => {
    btn.classList.toggle(
      "app__filter--active",
      btn.dataset.filter === currentFilter,
    );
  });
}

// Функция рендера
function render() {
  taskList.innerHTML = "";
  const filtered = tasks.filter((task) => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "done") return task.done;
    return true;
  });

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = task.id;
    if (task.done) li.classList.add("task--done");
    li.innerHTML = `<span class="task__text">${task.text}</span> <button class="task__delete" data-id="${task.id}" aria-label="Удалить">✕</button>`;
    taskList.appendChild(li);
  });
  updateCounter();
}

const taskList = document.querySelector("#task-list"); /* Список <ul> */
const counter = document.querySelector("#counter"); /* Счётчик */
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");

loadState();
updateActiveFilter();
render();

// Функция счетчика
function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  counter.textContent = `${done} из ${total}`;
}

// Добавление
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  const newTask = {
    id: crypto.randomUUID(),
    text: text,
    done: false,
  };
  tasks.push(newTask);
  input.value = "";
  saveTasks();
  render();
});

// Удаление
taskList.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".task__delete");
  if (!deleteBtn) return;
  const id = deleteBtn.dataset.id;
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
});

// Обработка выполнено/не выполнено
taskList.addEventListener("click", (event) => {
  const taskItem = event.target.closest(".task");
  if (!taskItem) return;
  if (event.target.closest(".task__delete")) return;

  const id = taskItem.dataset.id;
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: !task.done };
    }
    return task;
  });
  saveTasks();
  render();
});

// Фильтры
const filters = document.querySelector("#filters");
filters.addEventListener("click", (event) => {
  const btn = event.target.closest(".app__filter");
  if (!btn) return;
  currentFilter = btn.dataset.filter;
  saveTasks();
  updateActiveFilter();
  render();
});
