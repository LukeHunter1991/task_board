// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Create variables from form.
const $titleEl = $('#inputTitle');
const $dateEl = $('#inputDate');
const $taskDataEl = $('taskDetails');
const $saveBtnEl = $('#saveBtn');

// Create array of existing blog posts
let taskCollection = JSON.parse(localStorage.getItem('tasks')) || [];

// Todo: create a function to generate a unique task id
function generateTaskId() {

    // Check if array is null
    if (taskCollection) {
        // Go to last object in array. New id is last object id +1.
        return taskCollection[taskList.lenghth - 1].id + 1
    } else {
        // If array is empty, ID can be 1.
        return 1;
    }
}

// Todo: create a function to create a task card
function createTaskCard(task) {
// Is this to create the card element but not oush to page?

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    // Calls function to create a new task ID.
    const newId = generateTaskId();

    // Create object to store new task.
    const taskObj = {
        title: $titleEl,
        date: $dateEl,
        taskData: $taskDataEl,
        // Add generated task ID
        id: newId
    }

    // Add current task object to array.
    taskCollection.push(taskObj);

    // Push updated array of objects to local storage.
    localStorage.setItem('tasks', JSON.stringify(taskCollection));

    // Figure out which function to call.
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Add event listener for submit button to execute handleAddTask function.

});
