import React from 'react';
import { User } from './User';
import './TodoItem.css'

export class TodoItem extends React.Component {
  render() {
    const {
      title,
      completed,
      user,
    } = this.props;

    return (
      <tr>
        <td className="title">
          <p>{title}</p>
        </td>
        <td className={completed ? 'completed' : 'not-completed'}>
        </td>
        <td>
          <User name={user.name} />
        </td>
      </tr>
    );
  }
} 
  