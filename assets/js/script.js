var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");//grandparent <ul>
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;

//buttonEl.addEventListener("click", function() {
//    var taskItemEl = document.createElement("li");
//    taskItemEl.className = "task-item";
//    taskItemEl.textContent = "new task";
//    tasksToDoEl.appendChild(taskItemEl);
//})

var taskFormHandler = function(event) {
    
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //cedit mode 
    var isEdit = formEl.hasAttribute("data-task-id");

    //package data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput 
    }

    //check for data
    if (!taskNameInput || !taskTypeInput) {
        alert("Please fill our all of the form.")
        return false;
    }
    //reset screen (does not remove values for createTaskEL) (reset () only works on forms)
    formEl.reset();
    

    //send it as an argumelt to createTaskEl or Edit if in edit mode
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
        //return ~ can work instead of the other delete
    }
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput 
        };
    }

    creatTaskEl(taskDataObj);
}

var creatTaskEl = function(taskDataObj) {
        //create list item (parent node) <li>
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

        // add task id to custom attribute
        listItemEl.setAttribute("data-task-id", taskIdCounter)

        //crate div to hold all task info (kid's info node) <div>
        var taskInfoEl = document.createElement("div");
        //inside
            taskInfoEl.className = "task-info";
            taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
            //append/add the taskInfoEl node (kid's info node) to the listInfoEL (parent item node)
            listItemEl.appendChild(taskInfoEl);

        //add in the create task action buttons
        var taskActionsEl = createTaskAction(taskIdCounter);
        listItemEl.appendChild(taskActionsEl)
        //add listItemEl (parent node) to the taskToDoEl (grandparent node)
        tasksToDoEl.appendChild(listItemEl);

        //increase task counter by 1 for next time
        taskIdCounter++;
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
}
//for funzies can do all functions like this..function createTaskAction(taskId) but does not work above ask why 
var createTaskAction = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // insert buton into div
    actionContainerEl.appendChild(editButtonEl);

    //delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    //insert delete buton into dev
    actionContainerEl.appendChild(deleteButtonEl)

    //select element where item is going (To Do, In Progress, Done)
    var statusSelectEl = document.createElement("select");
    var statusChoices= ["To Do", "In Progress", "Completed"];
        for (var i = 0; i <statusChoices.length; i++) {
            //crate option elements
            var statusOptionEl = document.createElement("option");
            statusOptionEl.textContent = statusChoices[i];
            statusOptionEl.setAttribute("value", statusChoices[i]);
            //insert selections
            statusSelectEl.appendChild(statusOptionEl); 
        }
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    //insert select element into div
    actionContainerEl.appendChild(statusSelectEl)

    return actionContainerEl;

}
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");//select section with ID  data-task-id="#" , This was asigned when the task was created 
    taskSelected.remove();
}

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");//select wholes section with ID # (like above)
    //get task name to overwrite
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    //get task variable to overwrite
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    //overwrite
    document.querySelector("input[name='task-name']").value = taskName;
    taskType = document.querySelector("select[name='task-type']").value = taskType;

    //let viewer know that you are in edit mode 
    document.querySelector("#save-task").textContent = "Save Edited Task";
    formEl.setAttribute("data-task-id", taskId)
    taskSelected.remove();
}
var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

  };

var taskStatusChangeHandler = function(event) {
    //get task item id
    var taskId = event.target.getAttribute("data-task-id");
    //get current selections valeu and convert to lower cae
    var statusValue = event.target.value.toLowerCase();
    //find parent task item based on ID
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); 

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }

}; 

formEl.addEventListener("submit", taskFormHandler)
pageContentEl.addEventListener("click", taskButtonHandler)
pageContentEl.addEventListener("change", taskStatusChangeHandler)
//Note:
// innerHTML means read as HTML - this alows for markips
//textContent means reed as block of text - this alows for now inline markups all characters will render as a block of text
// ! means NOT as in false value
// <select> in html gives dropdown
//submit = listener for a form so hiting enter works
//event.PreventDefault(); stops page from reloading every time a form is submitted
//all form data has value property whick we pull
//reset() returns form to cleared mode 
// data-* is a custom data marker
// .setAtribute() alows you to ad an atribute tag in the html
//.getAttribute()retrieve an atribute
//.removeAtribute() delete an atribute 
//.remove() remove ... just liek it sounds . that ica nremove a whole section or just a word
//.matches() find things that match given criteria can be class, id, or temp id
//stopPropogation() stops bubbling
//querySeletor() searches within whatever folder is in front of it  ex.  documents.querySelector() serches whole page doc.