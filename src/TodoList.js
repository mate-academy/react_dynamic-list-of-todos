import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const HEADERS = {
  id: 'Id',
  title: 'Description',
  completed: 'Is completed?',
  user: 'Responsible person',
};

const TodoList = ({ list }) => {
  const [todos, sortTodos] = useState(list);
  const [activeField, setActiveField] = useState('id');

  const sortList = (field) => {
    let callback;

    switch (typeof list[0][field]) {
      case 'string':
        callback = (a, b) => a[field].localeCompare(b[field]);
        break;
      case 'object':
        callback = (a, b) => a[field].name.localeCompare(b[field].name);
        break;
      default:
        callback = (a, b) => a[field] - b[field];
    }

    if (activeField !== field) {
      sortTodos(todos.sort(callback));
      setActiveField(field);
    } else {
      sortTodos([...todos].reverse());
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(HEADERS).map(header => (
            <th
              onClick={() => sortList(header)}
              key={header}
            >
              {HEADERS[header]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoItem key={todo.id} item={todo} />)
        )}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

export default TodoList;
