import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filteredItems: Todo[];
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null,
};
export const TodoList: React.FC<Props> = ({
  filteredItems,
  setSelectedTodo,
  selectedTodo,
}) => {
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
        {filteredItems.map((todo) => {
          const isTodoSelected = selectedTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              key={todo.id}
              className={isTodoSelected ? 'has-background-info-light' : ''}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn(todo.completed
                    ? 'has-text-success' : 'has-text-danger')}
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
                    <i className={
                      `far fa-eye${isTodoSelected ? '-slash' : ''}`
                    }
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
};
