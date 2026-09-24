let tasks = [
  /* Массив задач */
  { id: 1, text: "Изучить JavaScript", done: false },
  { id: 2, text: "Сделать To-Do", done: true },
  { id: 3, text: "Залить на GitHub", done: false },
];

const taskList = document.querySelector("#task-list"); /* Список <ul> */
const counter = document.querySelector("#counter"); /* Счётчик */

// Функция рендера
function render() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    if (task.done) li.classList.add("task--done");
    li.innerHTML = `<span class="task__text">${task.text}</span>`;
    taskList.appendChild(li);
  });
  updateCounter();
}

// Функция счетчика
function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  counter.textContent = `${done} из ${total}`;
}

render();
