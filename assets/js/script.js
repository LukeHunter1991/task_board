// Retrieve tasks and nextId from localStorage. If null, create an empty array.
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"))  || 0;

// Create elements for divs To Do, In Progress, Done
const $toDoEl = $('#todo-cards').addClass('.lane').attr('background-color', 'black');
const $inProgressEl = $('#in-progress-cards').addClass('.lane');
const $doneEl = $('#done-cards').addClass('.lane');


// Creates a function to generate a unique task id
function generateTaskId() {
    // As the nextID is assigned 0 if there is nothing in local storage, the next id can always be the curent ID plus 1.
        nextId++
        localStorage.setItem('nextId', nextId);
}

// Creates a function to create a task card
function createTaskCard(task) {
    // Set up task card from object values.
    const $cardEl = $('<div>').addClass('card dragbox').attr('id', task.id).css('margin', '5%');
    const $cardBodyEl = $('<div>').attr('class', 'card-body');
    const $cardTitleEl = $('<h5>').attr('class', 'card-header');
    const $cardTextEl = $('<p>').attr('class', 'card-text');
    const $cardDate = $('<p>').attr('class', 'card-date');
    const $cardButtonEl = $('<a>').attr('href', '#').attr('class', 'btn btn-primary deleteBtn').text('Delete').attr('id', task.id);

    // Uses cardDue function to return the class depending on if the task is overdue, due today, or due in future. 
    const cardBackground = cardDue(task.date);

    // Adds class for CSS styling based on due status/ 
    $cardEl.addClass(cardBackground);

    // Push relevant text from the task object into relevant elements.
    $cardTitleEl.text(task.title);
    $cardTextEl.text(task.taskData);
    $cardDate.text(task.date);

    // Create card by appending elements into card body.
    $cardBodyEl.append($cardTextEl, $cardDate, $cardButtonEl);

    // Add all elemnts into card via cardBodyEl
    $cardEl.append($cardTitleEl, $cardBodyEl);

      return $cardEl;
        
}

// Creates a function to render the task list and make cards draggable
function rendertaskList() {

    // Grabs tasks from local storage.
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // Ensures existing cards are removed from all lanes.
    $toDoEl.empty();
    $inProgressEl.empty();
    $doneEl.empty();

    // Loops through all tasks in local storage.
    for (items of taskList) {
        // Build and return card elements
        card = createTaskCard(items);

        // Loads tasks into the current lanes.
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

// Create a function to handle adding a new task
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

    // Clear form
    document.getElementById("form").reset();

    // Add current task object to array.
    taskList.push(taskObj);

    // Push updated array of objects to local storage.
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Call createTaskCard function.
    rendertaskList();

}

// Creates a function to handle deleting a task
function handleDeleteTask(event){
    const deleteId = event.target.id;
    let taskList = JSON.parse(localStorage.getItem("tasks"));

    // Remove only the task with the corresponding ID from the array.
    taskList.forEach((task) => {
      if (task.id == deleteId) {
        taskList.splice(taskList.indexOf(task), 1);
      }
    });

  
    // Save updated array to local storage.
    localStorage.setItem('tasks', JSON.stringify(taskList));
  
    //Here we use our other function to render our updated task list from local storage.
    rendertaskList();

}

// Creates a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

  // Get id from dropped element.
  const taskId = ui.draggable[0].id;

  // Get the id of the lane that the card was dropped into.
  const newStatus = event.target.id;

  const updateTasks = JSON.parse(localStorage.getItem('tasks'));

  for (let update of updateTasks) {
    //Find the task by the `id` and update the status to the relevant lane.
    if (update.id == taskId) {
        update.status = newStatus;
    }
  }
  // Save the updated tasks array to localStorage.
  localStorage.setItem('tasks', JSON.stringify(updateTasks));
  rendertaskList();
}

function cardDue(cardDate) {
    // Create dayjs objects for the current date, and the task date ont he card.
    const today = dayjs();
    const date1 = dayjs(cardDate);

    // Get difference between current date and task date.
    const dateDiff = today.diff(date1, 'd', true);

    // Based on difference between dates, return class for CSS styling.
    if (dateDiff > 1) {
        return 'overdue';
    } else if (dateDiff > 0 && dateDiff < 1) {
        return 'due';
    } else {
        return 'current';
    };

}

// When the page loads, renders the task list, adds event listeners, makes lanes droppable, and makes the due date field a date picker.
$(document).ready(function () {
    // Add event listener for submit button to execute handleAddTask function.
    $('#saveBtn').on('click', handleAddTask);

    // Add event listener to container. Only triggered if delete button is clicked.
    $('.container').on('click', '.deleteBtn', handleDeleteTask);

    // Add date picker to modal.
    $( "#inputDate" ).datepicker({
        changeMonth: true,
        changeYear: true,
    });

    // Make lanes droppable.
    $('.lane').droppable({
        accept: '.dragbox',
        drop: handleDrop,
      });

      // Render tasks from local storage on page load.
      rendertaskList()
});
