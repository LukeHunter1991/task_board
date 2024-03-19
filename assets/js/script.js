// Retrieve tasks and nextId from localStorage. If null, create an empty array.
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"))  || [];


// Create elements for divs To Do, In Progress, Done
const $toDoEl = $('#todo-cards');
const $inProgressEl = $('#in-progress');
const $doneEl = $('#done');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // Check if array is null
    if (nextId.length == 0) {
        // If array is empty, ID can be 1.
        localStorage.setItem('nextId', JSON.stringify('1'))
    } else {
    // New ID is array length + 1
        localStorage.setItem('nextId', JSON.stringify(nextId.length + 1))
    }
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // Should I add taskID to the card or to the delete button?
    const $cardEl = $('<div>').attr('class', 'card').attr('id', task.id);
    const $cardBodyEl = $('<div>').attr('class', 'card-body');
    const $cardTitleEl = $('<h5>').attr('class', 'card-heading');
    const $cardTextEl = $('<p>').attr('class', 'card-text');
    const $cardDate = $('<p>').attr('class', 'card-date');
    const $cardButtonEl = $('<a>').attr('href', '#').attr('class', 'btn btn-primary').text('Delete');

    $cardTitleEl.text(task.title);

    // Add if statements and day js to determine if task is overdue, due today, or due in future. Update backgrounbd color accordingly.

    $cardTextEl.text(task.taskData);
    $cardDate.text(task.date);

    // Create card by appending elements into card body.
    // Add $cardTextEl once completed
    $cardBodyEl.append($cardTitleEl);
    $cardBodyEl.append($cardTextEl);
    $cardBodyEl.append($cardDate);
    $cardBodyEl.append($cardButtonEl);

    // Add alle lemnts into card via cardBodyEl
    $cardEl.append($cardBodyEl);

    // Add card into To Do section
    $toDoEl.append($cardEl);
}

// Todo: create a function to render the task list and make cards draggable
function rendertaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    // Create variables from form.
    const titleEl = document.querySelector('#inputTitle');
    const dateEl = document.querySelector('#inputDate');
    const taskDataEl = document.querySelector('#taskDetails');


    // Calls function to create a new task ID.
    const newId = generateTaskId();

    // Create object to store new task.
    const taskObj = {
        title: titleEl.value,
        date: dateEl.value,
        taskData: taskDataEl.value,
        id: newId
    };



    // Add current task object to array.
    taskList.push(taskObj);

    // Push updated array of objects to local storage.
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Call createTaskCard function.
    createTaskCard(taskObj);

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
    $('#saveBtn').on('click', handleAddTask);
});
