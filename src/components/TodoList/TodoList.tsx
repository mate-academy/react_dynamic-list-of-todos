import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList = React.memo(({ todos }: Props) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

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
          {todos.map(todo => {
            const isCompleted = todo.completed;

            return (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {isCompleted && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': isCompleted,
                      'has-text-danger': !isCompleted,
                    })}
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
                      <i
                        className={classNames('far', {
                          'fa-eye': selectedTodo !== todo,
                          'fa-eye-slash': selectedTodo === todo,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClouse={() => setSelectedTodo(null)} />
      )}
    </>
  );
});

TodoList.displayName = 'TodoList';
