import React from 'react';
import User from './User'

const TodoItem = ({ todo }) => (
  <tbody>
    <tr>
      <td>
        <label className='container-label-check'>
          <input className="form-check" type="checkbox"
            id={todo.id}
            checked={todo.completed} />
        </label>
      </td>
      <td>{todo.title}</td>
      <td><User item={todo.user} /></td>
    </tr>
  </tbody>
);

export default TodoItem
