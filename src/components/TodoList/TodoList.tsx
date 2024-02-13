import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  selectTodo: (item:Todo) => void,
  setViewChecker: (state:boolean) => void,
  viewChecker: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos, selectTodo,
  setViewChecker,
  viewChecker,
}) => {
  // eslint-disable-next-line max-len
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);

  const handleButtonClick = (todo: Todo, index:number) => {
    selectTodo(todo);
    setViewChecker(true);
    setSelectedButtonIndex(index);
  };

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
        {todos.map((todo, index) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className=""
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}

            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => {
                  handleButtonClick(todo, index);
                }}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i className={`far ${selectedButtonIndex === index && viewChecker ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
