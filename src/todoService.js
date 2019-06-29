export const getTodos = function() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
}

export const getUsers = function() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
}