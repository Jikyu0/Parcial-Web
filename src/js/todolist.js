// Selección de elementos
const taskList = document.querySelector('.list-group');
const newTaskInput = document.getElementById('newTask');

// Inicializa las tareas desde el localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Agregar una nueva tarea
function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') {
    alert('Task cannot be empty!');
    return;
  }

  // Crear elemento de lista
  const taskItem = createTaskElement(taskText);

  // Agregar al DOM
  taskList.appendChild(taskItem);

  // Guardar en localStorage
  saveTaskToLocalStorage(taskText);

  // Limpiar el campo de entrada
  newTaskInput.value = '';
}

// Crear un elemento de tarea
function createTaskElement(taskText) {
  const taskItem = document.createElement('div');
  taskItem.className =
    'list-group-item d-flex justify-content-between align-items-center';

  // Contenido de la tarea con checkbox
  taskItem.innerHTML = `
    <label class="custom-checkbox">
      <input type="checkbox" />
      <span class="checkmark"></span>
      ${taskText}
    </label>
    <button class="btn btn-sm btn-danger">Delete</button>
  `;

  // Agregar funcionalidad de eliminar
  taskItem.querySelector('.btn-danger').addEventListener('click', function () {
    deleteTask(taskItem, taskText);
  });

  return taskItem;
}

// Guardar una tarea en el localStorage
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Eliminar una tarea
function deleteTask(taskItem, taskText) {
  // Eliminar del DOM
  taskItem.remove();

  // Eliminar del localStorage
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Cargar tareas desde el localStorage al cargar la página
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((taskText) => {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
  });
}

// Obtener tareas desde el localStorage
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}
