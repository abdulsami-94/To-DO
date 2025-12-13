let tasks = [];

// Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem("tasks");

    if (stored) {
        tasks = JSON.parse(stored);
    }
}

// DOM Elements
const statTotal = document.getElementById("stat-total");
const statDone = document.getElementById("stat-done");
const statPending = document.getElementById("stat-pending");

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Add Button
addBtn.addEventListener("click", function() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert ("Try writing something , GENIUS!");
        return ;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    render();

    taskInput.value = "";

});

    function render() {
    
        list.innerHTML = "";

        for (const task of tasks) {

        const li = document.createElement("li");

        // checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            toggleComplete(task.id);
        });

        // Text
        const textSpan = document.createElement("span");
        textSpan.innerText = task.text;
        textSpan.classList.toggle("completed", task.completed);


        // Delete Button
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.innerText = "X";
        delBtn.addEventListener("click" , function () {
            deleteTask(task.id);
        });

        // Combine
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);

        list.appendChild(li);
    }

    updateStats();
}

// Toggle Task
function toggleComplete(id) {

    for (const task of tasks) {
        if (task.id === id) {
            task.completed = !task.completed;
            break;
        }
    }

    saveTasks();
    render();
}

// Delete Task
function deleteTask(id) {
    
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    render();
}

// Update Stats
function updateStats() {

    const total = tasks.length;
    const done = tasks.filter (task => task.completed).length;
    const pending = total - done;

    statTotal.innerText = total;
    statDone.innerText = done;
    statPending.innerText = pending;
}

document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
    render();
});
