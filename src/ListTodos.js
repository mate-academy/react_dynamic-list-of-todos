import React from 'react';

function ListTodos (props) {
  const todos = props.todos;
  return (
    <>
      {todos.map((todo, index) => (
        <tr key={todo.title + index}>
          <td>{todo.user.name}:</td>
          <td>{todo.title}:</td>
          <td>{todo.completed.toString()}:</td>
        </tr>
      ))}
    </>
  );
}

export default ListTodos;
