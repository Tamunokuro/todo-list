import './style.css';
import addIcon from './assets/icons/add.png';
import deleteIcon from './assets/icons/delete.png';

const addTodo = document.getElementById('add-todo');
const iconAdd = new Image();
iconAdd.src = addIcon;
addTodo.appendChild(iconAdd);

const iconRemove = new Image();
iconRemove.src = deleteIcon;

const todoContainer = document.getElementById('todo-list');
const todoList = [
  {
    index: 1,
    description: 'Wash the dishes',
    completed: true,
  },
  {
    index: 2,
    description: 'Complete the To-do list project',
    completed: false,
  },
  {
    index: 3,
    description: 'Set up webpack',
    completed: true,
  },
];

const displayTodo = () => {
  todoList.forEach((todo) => {
    todoContainer.innerHTML += `
    <li class='todo-list'>
    <input class='select' type="checkbox">
    <input class='todo-item' id="${todo.index}" value="${todo.description}">
    <span>
    <img id='remove-icon' src='${iconRemove.src}' id=${todo.index}>
    </span>
    </li>
    `;
  });
};

displayTodo();