import React, { useCallback } from 'react';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

function hightlight(filter: string, text: string) {
  if (!filter) {
    return text;
  }

  const regexp = new RegExp(filter, 'ig');
  const matchValue = text.match(regexp);

  if (matchValue) {
    return text.split(regexp).map((symbol, index, array) => {
      if (index < array.length - 1) {
        const matchSymbol = matchValue.shift();

        return (
          <>
            {symbol}
            <span className="hightlight">{matchSymbol}</span>
          </>
        );
      }

      return symbol;
    });
  }

  return text;
}

type Props = {
  selectTodo: (todo: Todo) => void;
  todos: Todo[];
  selectedTodoId: number | null;
  filter: string;
  onLoading: boolean;
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    selectTodo,
    selectedTodoId,
    filter,
    onLoading,
  } = props;

  const light = useCallback((text: string) => {
    return hightlight(filter, text);
  }, [filter]);

  return (
    <table className="table is-narrow is-fullwidth">
      {onLoading
        ? <h3 className="Loading">Loading...</h3>
        : (
          <thead>
            {todos.length > 0
              ? (
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
              )
              : <h3 className="Loading">No todos for your search query :( </h3>}

          </thead>
        )}

      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className=""
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {light(todo.title)}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(todo)}
              >
                <span className="icon">
                  <i className={todo.id === selectedTodoId
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
