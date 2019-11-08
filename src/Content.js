import React from 'react';

import ListTodos from './ListTodos';

function Content(props) {
  const list = props.list;
  let todos = props.list.listTodos;

  if(list.isLoaded && todos === null) {
    return <p>...loading</p>
  } else if (!list.isLoaded && todos === null) {
    return <p>not loaded</p>;
  } else if (list.isLoaded && todos !== null) {
    if(list.sortBy === 'Name') {
      todos = todos.sort((a, b) => a.user.name.localeCompare(b.user.name));
    } else if (list.sortBy === 'Status') {
      todos = todos.sort((a, b) => a.completed - b.completed);
    }

    return (
      <table>
        <tbody>
          <ListTodos todos={todos} />
        </tbody>
      </table>
    );
  }
}

export default Content;
