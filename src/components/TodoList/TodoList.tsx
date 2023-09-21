import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  list: Todo[];
  activeTodo: Todo | null;
  handleTask: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ list, handleTask, activeTodo }) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {list.map((todo: Todo) => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>{todo.title}</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => handleTask(todo)}
            >
              <span className="icon">
                <i className={`far fa-eye${activeTodo === todo ? '-slash' : ''}`} />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
