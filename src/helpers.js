export function getTodos() {
  return (
    fetch('https://mate-api.herokuapp.com/todos')
      .then(response => response.json())
      .then(result => result.data)
  );
}

export function getUser(userId) {
  return (
    fetch(`https://mate-api.herokuapp.com/users/${userId}`)
      .then(response => response.json())
      .then(result => result.data)
  );
}
