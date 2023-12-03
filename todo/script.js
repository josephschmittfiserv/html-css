let taskInput = document.getElementById("new-task");
let addButton = document.getElementById("addButton");
let incompleteTasks = document.getElementById("incomplete-tasks");
let completedTasks = document.getElementById("completed-tasks");
let clearButton = document.getElementById("clear");

let createNewTask = function(taskName) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    checkBox.type = "checkBox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskName;
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

let addTask = function() {
    if (taskInput.value == "") {
        alert("Task to be added should not be empty!");
        return;
    }
    let listItem = createNewTask(taskInput.value);
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";

    saveTasksToLocalStorage();
}

let editTask = function() {

    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");

    // Save updated todo list to localStorage
    saveTasksToLocalStorage();
}

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

    // Save updated todo list to localStorage
    saveTasksToLocalStorage();
}

let taskCompleted = function() {
    let listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

    // Save updated todo list to localStorage
    saveTasksToLocalStorage();
}


let taskIncomplete = function() {
    let listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    // Save updated todo list to localStorage
    saveTasksToLocalStorage();
}

addButton.addEventListener("click", addTask);
let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelector('input[type="checkbox"]');
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

let clear = function() {
    incompleteTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    // Save updated todo list to localStorage
    saveTasksToLocalStorage();
}

clearButton.addEventListener('click', clear);

// Added the listener for the button in page.html with the id theme_toggler
// That button will toggle the body tag in css to toggle to body.dark_mode
document.addEventListener('DOMContentLoaded', function() {
    let themeToggler = document.getElementById('theme_toggler');
    themeToggler.addEventListener('click', function() {
        document.body.classList.toggle('dark_mode');
    });
});

// Load todo list from localStorage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || { incomplete: [], completed: [] };

// Clear existing tasks
incompleteTasks.innerHTML = "";
completedTasks.innerHTML = ""

// Load incomplete tasks
savedTasks.incomplete.forEach(taskName => {
    const listItem = createNewTask(taskName);
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
});

savedTasks.completed.forEach(taskName => {
    const listItem = createNewTask(taskName);
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
});

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    const incompleteTasksArray = Array.from(incompleteTasks.querySelectorAll('label')).map(task => task.innerText);
    const completedTasksArray = Array.from(completedTasks.querySelectorAll('label')).map(task => task.innerText);

    const tasks = {
        incomplete: incompleteTasksArray,
        completed: completedTasksArray,
    };

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
