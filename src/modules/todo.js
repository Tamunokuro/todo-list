import deleteIcon from '../assets/icons/delete.png';

const iconRemove = new Image();
iconRemove.src = deleteIcon;

const todoList = [];

export default class ToDo {
  constructor(todo) {
    this.description = todo;
    this.index = todoList.length + 1;
    this.completed = false;
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
      const todoInput = document.createElement('input');
      todoInput.setAttribute('type', 'text');
      todoInput.setAttribute('class', 'todo-item');
      todoInput.setAttribute('id', `${todo.index}`);
      todoInput.setAttribute('readonly', true);
      todoInput.setAttribute('value', `${todo.description}`);
      const removeElement = document.createElement('img');
      removeElement.setAttribute('class', 'remove-icon');
      removeElement.setAttribute('src', `${iconRemove.src}`);
      removeElement.setAttribute('id', `${todo.index}`);
      todoLi.append(todoCheck, todoInput, removeElement);
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
        localStorage.setItem('todoList', JSON.stringify(todoList));
        todoContainer.remove();
        window.location.reload();
      });
    });
  }
}
