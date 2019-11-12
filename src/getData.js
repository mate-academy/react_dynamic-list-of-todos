
async function getData (url) {
  const responseTodos = await fetch(url);
  const items = await responseTodos.json();
  
  return items;
}

export default getData;
