import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | undefined;
  isModalShowed: boolean;
  setTodo: (todo: Todo) => void;
  setIsModalShowed: (bool: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  isModalShowed,
  setTodo,
  setIsModalShowed,
}) => {
  const [selected, setSelected] = useState<Todo>();

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
        {todos?.map(todo => (
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
              {todo.completed ? (
                <p className="has-text-success">{todo.title}</p>
              ) : (
                <p className="has-text-danger">{todo.title}</p>
              )}
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setTodo(todo);
                  setIsModalShowed(true);
                  setSelected(todo);
                }}
              >
                <span className="icon">
                  {selected === todo && isModalShowed ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
