export const todos = () => fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json());
