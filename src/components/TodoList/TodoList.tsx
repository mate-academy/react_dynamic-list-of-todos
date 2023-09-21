import React, {
  Dispatch,
  SetStateAction,
} from 'react';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../filteredTodos/filteredTodos';

type Props = {
  todos: Todo[],
  setHandleClose: Dispatch<SetStateAction<boolean>>,
  handleClose: boolean,
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>,
  selectedTodo: Todo | null,
  filter: string,
  searchText: string,
};

export const TodoList: React.FC<Props> = ({
  setHandleClose,
  handleClose,
  setSelectedTodo,
  selectedTodo,
  filter,
  searchText,
  todos,
}) => {
  const filteredTodos = filterTodos({ todos, filter, searchText });

  // eslint-disable-next-line no-console
  console.log(selectedTodo);

  function handleClick(todo: Todo) {
    setHandleClose(true);
    setSelectedTodo(todo);
  }

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

        {filteredTodos?.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed === true
              && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  (todo.completed === true)
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i className={
                    (!handleClose)
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'
                  }
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
