document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });
  
  /**
   * Task form
   */
  const taskForm = document.querySelector("#taskForm");
  
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskForm["title"].value;
    const description = taskForm["description"].value;
    console.log(title, description);
    App.createTask(title, description);
  });