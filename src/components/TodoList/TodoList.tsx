import React, { useState } from 'react';
import { TodoModal } from '../TodoModal';
import classNames from 'classnames';
type Props = {
  todos: Todo[];
};
export const TodoList: React.FC<Props> = ({ todos }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [load, setLoad] = useState(false);

  return (
    <>
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
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td
                className={classNames('is-vcentered', {
                  'fas fa-check': todo.completed,
                })}
              />
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed },
                  )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setSelectedTodo(todo);
                    setLoad(true);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onChange={setSelectedTodo}
          onLoad={setLoad}
          isLoading={load}
        />
      )}
    </>
  );
};
