import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId: number | null | undefined; // <-- Dodaj nową właściwość do typu
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodoId,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      {/* ... nagłówki tabeli bez zmian ... */}
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
        // Sprawdzamy, czy aktualnie renderowane zadanie jest tym wybranym
        const isSelected = todo.id === selectedTodoId;

        return (
          <tr
            data-cy="todo"
            key={todo.id}
            // Dodajemy klasę 'is-selected' dla podświetlenia wybranego wiersza
            className={classNames({ 'is-selected': isSelected })}
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
                data-cy="selectButton"
                className="button"
                type="button"
                title={isSelected ? 'Hide details' : 'View details'}
                onClick={() => onSelect(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': !isSelected, // Pokaż 'oko', jeśli nie jest wybrane
                      'fa-eye-slash': isSelected, // Pokaż 'przekreślone oko', jeśli jest wybrane
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
