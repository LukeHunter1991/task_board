// Retrieve tasks and nextId from localStorage. If null, create an empty array.
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"))  || 0;

// Create elements for divs To Do, In Progress, Done
const $toDoEl = $('#todo-cards').addClass('.lane').attr('background-color', 'black');
const $inProgressEl = $('#in-progress-cards').addClass('.lane');
const $doneEl = $('#done-cards').addClass('.lane');


// Todo: create a function to generate a unique task id
function generateTaskId() {
        nextId++
        // NextID + 1
        localStorage.setItem('nextId', nextId);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // Set up task card from object values.
    const $cardEl = $('<div>').addClass('card dragbox').attr('id', task.id);
    const $cardBodyEl = $('<div>').attr('class', 'card-body');
    const $cardTitleEl = $('<h5>').attr('class', 'card-heading');
    const $cardTextEl = $('<p>').attr('class', 'card-text');
    const $cardDate = $('<p>').attr('class', 'card-date');
    const $cardButtonEl = $('<a>').attr('href', '#').attr('class', 'btn btn-primary deleteBtn').text('Delete').attr('id', task.id);

    
    $cardTitleEl.text(task.title);

    $cardTextEl.text(task.taskData);
    $cardDate.text(task.date);

    // Create card by appending elements into card body.
    $cardBodyEl.append($cardTitleEl, $cardTextEl, $cardDate, $cardButtonEl);

    // Add all elemnts into card via cardBodyEl
    $cardEl.append($cardBodyEl);

      return $cardEl;
        
}

// Todo: create a function to render the task list and make cards draggable
function rendertaskList() {

    // Grabs tasks from local storage.
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // Ensures existing cards are removed from all lanes.
    $toDoEl.empty();
    $inProgressEl.empty();
    $doneEl.empty();

    for (items of taskList) {
        card = createTaskCard(items);
        if (items.status == 'to-do') {
            $toDoEl.append(card);
        } else if (items.status == 'in-progress') {
            $inProgressEl.append(card);
        } else {
            $doneEl.append(card);
        }
    }

    // Add draggable jQuery to cards with class dragbox.
    $( ".dragbox" ).draggable({
        opacity: 0.7,
        zIndex: 100,
        // Creates a clone card when dragging. Visual element only.
        helper: function (event) {
          // If parent element is grabbed, finds draggable parent.
          const original = $(event.target).hasClass('.dragbox')
            ? $(event.target)
            : $(event.target).closest('.dragbox');
          // Ensure width matches original card.
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    // Create variables from form.
    const titleEl = document.querySelector('#inputTitle');
    const dateEl = document.querySelector('#inputDate');
    const taskDataEl = document.querySelector('#taskDetails');


    // Calls function to create a new task ID.
    generateTaskId();

    // Create object to store new task.
    const taskObj = {
        title: titleEl.value,
        date: dateEl.value,
        taskData: taskDataEl.value,
        id: nextId,
        status: "to-do"
    };

    // Add current task object to array.
    taskList.push(taskObj);

    // Push updated array of objects to local storage.
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Call createTaskCard function.
    rendertaskList();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const deleteId = event.target.id;
    let taskList = JSON.parse(localStorage.getItem("tasks"));

    // Remove only the task with the corresponding ID from the array.
    taskList.forEach((task) => {
      if (task.id == deleteId) {
        taskList.splice(taskList.indexOf(task), 1);
      }
    });

    console.log(taskList);

  
    // Save updated array to local storage.
    localStorage.setItem('tasks', JSON.stringify(taskList));
  
    //Here we use our other function to print projects back to the screen
    rendertaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

  // Get id from dropped element.
  const taskId = ui.draggable[0].id;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  const updateTasks = JSON.parse(localStorage.getItem('tasks'));

  for (let update of updateTasks) {
    // ? Find the project card by the `id` and update the project status.
    if (update.id == taskId) {
        update.status = newStatus;
    }
  }
  // Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('tasks', JSON.stringify(updateTasks));
  rendertaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Add event listener for submit button to execute handleAddTask function.
    $('#saveBtn').on('click', handleAddTask);

    // Add event listener to container. Only triggered if delete button is clicked.
    $('.container').on('click', '.deleteBtn', handleDeleteTask);

    $( "#inputDate" ).datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.dragbox',
        drop: handleDrop,
      });

      rendertaskList()
});
