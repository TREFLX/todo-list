let tasks = [
  /* Массив задач */
  { id: crypto.randomUUID(), text: "Изучить JavaScript", done: false },
  { id: crypto.randomUUID(), text: "Сделать To-Do", done: true },
  { id: crypto.randomUUID(), text: "Залить на GitHub", done: false },
];

const taskList = document.querySelector("#task-list"); /* Список <ul> */
const counter = document.querySelector("#counter"); /* Счётчик */

// Функция рендера
function render() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = task.id;
    if (task.done) li.classList.add("task--done");
    li.innerHTML = `<span class="task__text">${task.text}</span> <button class="task__delete" data-id="${task.id}" aria-label="Удалить">✕</button>`;
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

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");

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
  render();
});

// Удаление
taskList.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".task__delete");
  if (!deleteBtn) return;
  const id = deleteBtn.dataset.id;
  tasks = tasks.filter((task) => task.id !== id);
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
  render();
});
