// Retrieve tasks and nextId from localStorage. If null, create an empty array.
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"))  || 0;
console.log(nextId);

// Create elements for divs To Do, In Progress, Done
const $toDoEl = $('#todo-cards');
const $inProgressEl = $('#in-progress');
const $doneEl = $('#done');

// Todo: create a function to generate a unique task id
function generateTaskId() {
        nextId++
        // NextID + 1
        localStorage.setItem('nextId', nextId);
        console.log(nextId);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // Should I add taskID to the card or to the delete button?
    const $cardEl = $('<div>').addClass('card drag-box');
    const $cardBodyEl = $('<div>').attr('class', 'card-body');
    const $cardTitleEl = $('<h5>').attr('class', 'card-heading');
    const $cardTextEl = $('<p>').attr('class', 'card-text');
    const $cardDate = $('<p>').attr('class', 'card-date');
    const $cardButtonEl = $('<a>').attr('href', '#').attr('class', 'btn btn-primary').text('Delete').attr('id', task.id);

    $cardTitleEl.text(task.title);

    // Add if statements and day js to determine if task is overdue, due today, or due in future. Update backgrounbd color accordingly.

    $cardTextEl.text(task.taskData);
    $cardDate.text(task.date);

    // Create card by appending elements into card body.
    $cardBodyEl.append($cardTitleEl, $cardTextEl, $cardDate, $cardButtonEl);

    // Add all elemnts into card via cardBodyEl
    $cardEl.append($cardBodyEl);


    // Add card into To Do section
    $toDoEl.append($cardEl);

    
    // Add draggable jQuery
    $( ".drag-box" ).draggable({
        opacity: 0.7,
        zIndex: 100,
        // Creates a clone card when dragging. Visual element only.
        helper: function (e) {
          // If parent element is grabbed, finds draggable parent.
          const original = $(e.target).hasClass('.drag-box')
            ? $(e.target)
            : $(e.target).closest('.drag-box');
          // Ensure width matches original card.
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });
        
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
        id: newId,
        status: 'To Do'
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

    $( "#inputDate" ).datepicker();
});
