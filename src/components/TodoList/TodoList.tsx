import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
  query: string;
  filterOption: FilterOptions;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodo,
  query,
  filterOption,
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
      {todos
        .filter(todo => {
          switch (filterOption) {
            case 'all':
              return true;

            case 'active':
              return !todo.completed;

            case 'completed':
              return todo.completed;
          }
        })
        .filter(todo => todo.title.includes(query.toLowerCase()))
        .map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
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
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelect(todo)}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${selectedTodo?.id === todo.id ? '-slash' : ''}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);
