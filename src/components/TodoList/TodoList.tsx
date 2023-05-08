import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>
};

export const TodoList: React.FC<Props> = ({ todos, setSelectedTodo }) => {
  return (
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames(`has-background-info-light ${todo.completed ? 'completed' : ''}`)}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(`${!todo.completed ? 'has-text-danger ' : ''}`)}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};
