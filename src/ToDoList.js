import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, sort }) => (
  <table>
    <thead>
      <tr>
        <th onClick={() => sort('string', 'title')}>Title</th>
        <th onClick={() => sort('string', 'name')}>User</th>
        <th onClick={() => sort('bool', 'completed')}>State</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(({ title, id, completed, user: { name } }) => (
        <ToDoItem
          key={id}
          completed={completed}
          name={name}
          title={title}
        />
      ))}
    </tbody>
  </table>
);

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.func.isRequired,
};

export default ToDoList;
