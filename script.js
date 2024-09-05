class MyTaskManager {
    constructor() {
      this.textInput = document.getElementById('text-input');
      this.addBtn = document.getElementById('text-btn');
      this.taskList = document.getElementById('task-list');
      this.tasks = [];
  
      this.loadTasks();
      this.renderTasks();
  
      this.addBtn.addEventListener('click', () => this.addTask());
      this.textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.addTask();
        }
      });
    }
  
    loadTasks() {
      try {
        const storage = localStorage.getItem('tasks');
        if (storage) {
          this.tasks = JSON.parse(storage);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  
    saveTasks() {
      try {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }
  
    renderTasks() {
      this.taskList.innerHTML='';
      this.tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-items');
        listItem.textContent = task.name;
        
        const div=document.createElement('div')
        div.classList.add('div-element')
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
  
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
         div.appendChild(deleteBtn)
         div.appendChild(editBtn)
        
        listItem.appendChild(div);
        this.taskList.appendChild(listItem);
       
        // this.taskList.appendChild(deleteBtn);
        // this.taskList.appendChild(editBtn);
  
        deleteBtn.addEventListener('click', () => this.deleteTask(index));
        editBtn.addEventListener('click', () => this.editTask(listItem, index));
      });
    }
  
    addTask() {
      const userInput = this.textInput.value.trim();
      if (userInput) {
        const newTask = { name: userInput };
        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.textInput.value='';
      }
    }
  
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
      this.renderTasks();
    }
  
    editTask(listItem, index) {
      listItem.innerHTML = '';
      const newInput = document.createElement('input');
      newInput.type = 'text';
    //   newInput.value = this.tasks[index].name;
      newInput.value=''
  
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.id = 'save-btn';
  
      listItem.appendChild(newInput);
      listItem.appendChild(saveBtn);
  
      saveBtn.addEventListener('click', () => {
        this.tasks[index].name = newInput.value;
        this.saveTasks();
        this.renderTasks();
      });
    }
  }
  
  const manager = new MyTaskManager();