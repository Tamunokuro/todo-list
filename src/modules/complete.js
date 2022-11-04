export default function isCompleted() {
  const checked = document.querySelectorAll('.select');
  const todoItems = document.querySelectorAll('.todo-item');

  checked.forEach((itemCheck) => {
    itemCheck.addEventListener('change', (e) => {
      const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');

      todoList.forEach((item) => {
        if ((item.completed === false) && (+e.target.id === item.index)) {
          item.completed = true;
          todoItems.forEach((todoI) => {
            if (todoI.id === item.index.toString() && item.completed) { todoI.classList.add('checked'); }
          });
          localStorage.setItem('todoList', JSON.stringify(todoList));
        } else if ((item.completed === true) && (+e.target.id === item.index)) {
          item.completed = false;
          todoItems.forEach((todoI) => {
            if (todoI.id === item.index.toString() && !item.completed) { todoI.classList.remove('checked'); }
          });
          localStorage.setItem('todoList', JSON.stringify(todoList));
          window.location.reload();
        }
      });
    });
  });
}