import React from 'react';
import PropTypes from 'prop-types';

import './Styles/TodoList.css';
import TodoItem from './TodoItem';
import User from './User';

const TodoList = ({ data }) => (
  <div className="todolist">
    <table>
      <thead>
        <tr className="todolist-table-headline">
          <th className="td-headline">name</th>
          <th className="td-headline">title</th>
        </tr>
      </thead>
      <tbody className="todolist-table">
        {data.map(element => (
          <>
          <User userData={element.user} key={element.user.id} />
          <TodoItem todoData={element} />
          </>
        ))}
      </tbody>
    </table>
  </div>
);

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
