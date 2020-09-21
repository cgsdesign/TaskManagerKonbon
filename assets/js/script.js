var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");


//buttonEl.addEventListener("click", function() {
//    var taskItemEl = document.createElement("li");
//    taskItemEl.className = "task-item";
//    taskItemEl.textContent = "new task";
//    tasksToDoEl.appendChild(taskItemEl);
//})

var createTaskHandeler = function() {
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "new task";
    tasksToDoEl.appendChild(taskItemEl);

}

buttonEl.addEventListener("click", createTaskHandeler)