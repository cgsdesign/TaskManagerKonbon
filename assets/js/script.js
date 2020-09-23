var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");//grandparent <ul>


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
        //crate div to hold all task info (kid's info node) <div>
        var taskInfoEl = document.createElement("div");

        //inside
            taskInfoEl.className = "task-info";
            taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
            //append/add the taskInfoEl node (kid's info node) to the listInfoEL (parent item node)
            listItemEl.appendChild(taskInfoEl);
        
            //add listItemEl (parent node) to the taskToDoEl (grandparent node)
        tasksToDoEl.appendChild(listItemEl);
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