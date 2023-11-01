function wait(delay: number | undefined) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function get(url: string) {
  await wait(300);
  const res = await fetch(`https://mate-academy.github.io/react_dynamic-list-of-todos/api${url}.json`);

  return res.json();
}

export function getTodos() {
  return get('/todos');
}

export function getUser(userId: number) {
  return get(`/users/${userId}`);
}
