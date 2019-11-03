const API_TODOLIST = 'https://jsonplaceholder.typicode.com/todos';

function getToDoList() {
  return fetch(API_TODOLIST)
    .then(todos => todos.json());
}

export default getToDoList;
