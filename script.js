// DOM Elements and Global Variables
const addTaskBtn = document.getElementById('add-task');
const input = document.querySelector('input');
const taskList = document.querySelector('#task-list');

let taskId = 0;
let randomImgId = 1;

// Load tasks from local storage on page load
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task to the list
const addTask = (task) => {
  const taskItem = document.createElement('div');
  taskItem.classList.add('form-check', 'd-flex', 'align-items-center', 'gap-3');
  taskItem.innerHTML = `
    <input class="task-check" type="checkbox" id="task-${taskId}">
    <label class="task-check-label" for="task-${taskId}">${task}</label>
    <button type="button" class="btn-close" aria-label="Close" data-task-id="${taskId}"></button>
  `;
  taskList.appendChild(taskItem);
  taskId++;
};

// Function to remove a task from the list
const removeTask = (taskId) => {
  const taskItem = document.querySelector(`#task-${taskId}`).parentNode;
  taskList.removeChild(taskItem);
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to render tasks from local storage
const renderTasksFromLocalStorage = () => {
  tasks.forEach((task) => {
    addTask(task);
  });
};

// Handle Add Task button click
addTaskBtn.addEventListener('click', () => {
  const task = input.value.trim();
  const taskWithImg = `<img class="me-3" src="https://picsum.photos/50/50?random=${randomImgId}"> <span>${task}</span>`;

  if (task !== '') {
    addTask(taskWithImg);
    tasks.push(taskWithImg); // Add task to tasks array
    saveTasksToLocalStorage(); // Save tasks to local storage
    input.value = '';
    randomImgId++;
  }
});

// Handle completing a task and removing it from the list
taskList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('.task-check')) {
    const label = target.parentNode.querySelector('label');
    if (target.checked) {
      label.classList.add('text-decoration-line-through');
    } else {
      label.classList.remove('text-decoration-line-through');
    }
    saveTasksToLocalStorage(); // Save tasks to local storage when task completion status changes
  } else if (target.matches('.btn-close')) {
    const taskId = target.getAttribute('data-task-id');
    removeTask(taskId);
    tasks.splice(taskId, 1); // Remove task from tasks array
    saveTasksToLocalStorage(); // Save tasks to local storage after task removal
  }
});

// Render tasks from local storage on page load
renderTasksFromLocalStorage();
