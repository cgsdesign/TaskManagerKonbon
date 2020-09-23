var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");//grandparent <ul>
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

    //send it as an argumelt to createTaskEl
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
}

var createTaskAction = function(taskId) {
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


formEl.addEventListener("submit", taskFormHandler)


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
// .setAtribute alows you to ad an atribute tag  in the html