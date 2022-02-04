// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api/todos`;

export async function getAllTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();

  return todos;
}

export async function getSelectedUserDetails(userId: number) {
  const editedUrl = `https://mate.academy/students-api/users/${userId}`;
  const response = await fetch(editedUrl);
  const selectedUserDetails = await response.json();

  return selectedUserDetails;
}
