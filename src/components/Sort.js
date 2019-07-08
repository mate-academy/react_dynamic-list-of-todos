const Sort = (fieldOfSort, arr, sortStatus, updateAppState) => {
  switch (fieldOfSort) {
    case 'Status':
      arr.sort((a, b) => sortStatus * (a.completed - b.completed));
      break;
    case 'Todo':
      arr.sort((a, b) => sortStatus * a.title.localeCompare(b.title));
      break;
    case 'User':
      arr.sort((a, b) => sortStatus * a.user.name.localeCompare(b.user.name));
      break;
    default: break;
  }

  updateAppState({ todos: [...arr], sortStatus: -sortStatus });
};

export default Sort;
