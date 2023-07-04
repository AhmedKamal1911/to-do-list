let result = document.querySelector(".result");
let taskContent = document.querySelector("[type=text]");
// Retrive Tasks From local storage
let tasksList =
  JSON.parse(localStorage.getItem("tasks")) === null
    ? []
    : JSON.parse(localStorage.getItem("tasks"));
// Add element to page from localStorage
tasksList.forEach(function (element) {
  addTaskToPage(element.title, element.id);
});

let addBtn = document.getElementById("btn");
// Function onClick
addBtn.addEventListener("click", function () {
  if (taskContent.value.trim()) {
    //Result Div
    const taskId = addTaskToLocalStorage(taskContent.value);
    addTaskToPage(taskContent.value, taskId);
  }
});
// Create Object and push in list
function addTaskToLocalStorage(taskTitle) {
  const task = {
    id: Date.now(),
    title: taskTitle.trim(),
  };
  tasksList.push(task);
  window.localStorage.setItem("tasks", JSON.stringify(tasksList));
  return task.id;
}

// Add Task To Page
function addTaskToPage(taskTitle, taskId) {
  let task = document.createElement("div");
  task.className = "task";
  result.append(task);
  let taskText = document.createElement("p");
  task.append(taskText);
  taskText.textContent = taskTitle.trim();
  let deleteBtn = document.createElement("button");
  // Setting taskId into deleteBtn
  deleteBtn.dataset.taskid = taskId;
  // Adding click event on delete btn
  deleteBtn.addEventListener("click", deleteTask);
  deleteBtn.className = "delete";
  deleteBtn.innerHTML = "delete";
  task.append(deleteBtn);
}

// Delete Task
function deleteTask() {
  // this keyword here is delete btn
  this.parentElement.remove();
  const newTasksList = tasksList.filter((taskObject) => {
    return taskObject.id != this.dataset.taskid;
  });
  tasksList = newTasksList;
  window.localStorage.setItem("tasks", JSON.stringify(tasksList));
}
