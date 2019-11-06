
async function getUrl (url) {
  const responseTodos = await fetch(url);
  const todos = await responseTodos.json();
  return todos;
}

export default getUrl;
