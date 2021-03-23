export function getTodos() {
  return (
    fetch('https://mate-api.herokuapp.com/todos')
      .then(response => response.json())
      .then(result => result.data)
      .then(data => data.filter(todo => todo.title))
  );
}

export function getUser(userId) {
  return (
    fetch(`https://mate-api.herokuapp.com/users/${userId}`)
      .then(response => response.json())
      .then(result => result.data)
  );
}
