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
          <td><User userData={element.user} key={element.user.id} /></td>
          <td><TodoItem todoData={element} /></td>
          </>
        ))}
      </tbody>
    </table>

    {/* {data.map(element => (
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
    ))} */}
    ;
  </div>
);

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
