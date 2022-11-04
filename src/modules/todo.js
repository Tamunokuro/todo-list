import deleteIcon from '../assets/icons/delete.png';
import editIcon from '../assets/icons/edit.png';

const iconRemove = new Image();
iconRemove.src = deleteIcon;

const iconEdit = new Image();
iconEdit.src = editIcon;

const todoList = [];

export default class ToDo {
  constructor(todo) {
    this.description = todo;
    this.index = todoList.length + 1;
    this.completed = false;
    this.checked = false;
  }

  static addTodo() {
    const todoform = document.getElementById('todo-form');
    const todoinput = document.getElementById('todo-input');
    let todoList = [];
    todoform.addEventListener('submit', (e) => {
      e.preventDefault();
      todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
      const todoItem = new ToDo(todoinput.value);
      todoList.push(todoItem);
      todoList.forEach((todo, i) => {
        todo.index = i + 1;
      });
      localStorage.setItem('todoList', JSON.stringify(todoList));
      todoinput.value = '';
      window.location.reload();
    });
  }

  static displayTodo() {
    const todoContainer = document.getElementById('todo-list');
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');

    todoList.forEach((todo) => {
      const todoLi = document.createElement('li');
      todoLi.setAttribute('class', 'todo-list');
      const todoCheck = document.createElement('input');
      todoCheck.setAttribute('class', 'select');
      todoCheck.setAttribute('type', 'checkbox');
      todoCheck.setAttribute('id', `${todo.index}`);
      const todoInput = document.createElement('input');
      todoInput.setAttribute('type', 'text');
      todoInput.setAttribute('class', 'todo-item');
      todoInput.setAttribute('id', `${todo.index}`);
      todoInput.setAttribute('readonly', true);
      todoInput.setAttribute('value', `${todo.description}`);
      const editElement = document.createElement('img');
      editElement.setAttribute('class', 'edit-icon');
      editElement.setAttribute('src', `${iconEdit.src}`);
      editElement.setAttribute('id', `${todo.index}`);
      const removeElement = document.createElement('img');
      removeElement.setAttribute('class', 'remove-icon');
      removeElement.setAttribute('src', `${iconRemove.src}`);
      removeElement.setAttribute('id', `${todo.index}`);
      if (todo.completed) {
        todoCheck.checked = true;
        todoInput.style.textDecoration = 'line-through';
        todoInput.style.color = '#4169e1';
      } else {
        todoCheck.checked = false;
        todoInput.style.textDecoration = '';
        todoInput.style.color = '';
      }
      todoLi.append(todoCheck, todoInput, editElement, removeElement);
      todoContainer.appendChild(todoLi);
    });
  }

  static deleteTodo() {
    const del = document.querySelectorAll('.remove-icon');
    const todoContainer = document.getElementById('todo-list');
    del.forEach((delBtn, index) => {
      delBtn.addEventListener('click', () => {
        const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
        todoList.splice(index, 1);
        todoContainer.remove();
        todoList.forEach((todo, i) => {
          todo.index = i + 1;
        });
        localStorage.setItem('todoList', JSON.stringify(todoList));
        window.location.reload();
      });
    });
  }

  static editTodo() {
    const todoItems = document.querySelectorAll('.todo-item');
    const editIcons = document.querySelectorAll('.edit-icon');
    editIcons.forEach((edit) => {
      edit.addEventListener('click', (e) => {
        todoItems.forEach((item) => {
          if (e.target.id === item.id) item.removeAttribute('readonly');
        });
      });
      todoItems.forEach((todo) => {
        todo.addEventListener('focusout', () => {
          const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
          todoList.forEach((todoli) => {
            if (todoli.index.toString() === todo.id) {
              todoli.description = todo.value;
              localStorage.setItem('todoList', JSON.stringify(todoList));
              todo.setAttribute('readonly', true);
            }
          });
        });
      });
    });
  }

  static clearCompleted() {
    const clear = document.getElementById('clear');
    clear.addEventListener('click', (e) => {
      e.preventDefault();
      let todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
      todoList = todoList.filter((todo) => todo.completed === false);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      window.location.reload();
    });
  }

  static reset() {
    const refresh = document.getElementById('refresh');
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    refresh.addEventListener('click', (e) => {
      e.preventDefault();
      todoList.splice(0, todoList.length);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      window.location.reload();
    });
  }
}
