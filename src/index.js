import './style.css';
import addIcon from './assets/icons/add.png';
import isCompleted from './modules/complete.js';

import refreshIcon from './assets/icons/refresh.png';
import ToDo from './modules/todo.js';

const addTodo = document.getElementById('add-todo');
const iconAdd = new Image();
iconAdd.src = addIcon;
addTodo.appendChild(iconAdd);

const refresh = document.getElementById('refresh');
const refreshImg = new Image();
refreshImg.src = refreshIcon;
refresh.appendChild(refreshImg);

ToDo.addTodo();
ToDo.displayTodo();
ToDo.deleteTodo();
ToDo.editTodo();
isCompleted();
ToDo.clearCompleted();
ToDo.reset();