import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  visibleTodos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  selectedTodo,
  onTodoSelect,
}) => (
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
      {visibleTodos.map((todo) => {
        const isSelected = selectedTodo && selectedTodo.id === todo.id;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': isSelected,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed
              ? (
                <>
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className="has-text-success">{todo.title}</p>
                  </td>
                </>
              )
              : (
                <>
                  <td className="is-vcentered" />
                  <td className="is-vcentered is-expanded">
                    <p className="has-text-danger">{todo.title}</p>
                  </td>
                </>
              )}
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onTodoSelect(todo)}
              >
                <span className="icon">
                  <i className={cn('far', {
                    'fa-eye': !isSelected, 'fa-eye-slash': isSelected,
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
);
