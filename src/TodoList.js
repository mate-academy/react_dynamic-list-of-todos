import React from 'react';
import PropTypes from 'prop-types';

import './Styles/TodoList.css';
import TodoItem from './TodoItem';
import User from './User';

const TodoList = ({ data }) => (
  <div className="todolist">
    <table>
      <tbody>
        <tr className="todolist-table-headline">
          <td className="td-headline">name</td>
          <td className="td-headline">title</td>
        </tr>
      </tbody>
    </table>

    {data.map(element => (
      <table className="todolist-table">
        <tbody>
          <div className="todolist-table">
            <td className="td-user-component">
              <User userData={element.user} key={element.user.id} />
            </td>
            <td className="td-todoItem-component">
              <TodoItem todoData={element} />
            </td>
          </div>
        </tbody>
      </table>
    ))}
    ;
  </div>
);

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
