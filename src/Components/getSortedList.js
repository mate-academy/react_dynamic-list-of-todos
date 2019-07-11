let currentKey = '';
let currentTodos = [];
let sortedTodos = [];

const getSortedList = ({ todos, sortField }) => {
  if (currentKey === sortField && currentTodos === todos) {
    return sortedTodos.reverse();
  }

  currentKey = sortField;
  currentTodos = todos;

  const callbackMap = {
    id: (a, b) => a.id - b.id,
    title: (a, b) => a.title.localeCompare(b.title),
    user: (a, b) => a.user.name.localeCompare(b.user.name),
  };

  const callback = callbackMap[sortField] || callbackMap.id;

  sortedTodos = [...todos].sort(callback);

  return sortedTodos;
};

export default getSortedList;
