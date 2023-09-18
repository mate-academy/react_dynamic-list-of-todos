import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onClickHandlerOpenModal: (todo: Todo) => void;
  selectedTodo: Todo,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onClickHandlerOpenModal = () => {},
  selectedTodo,
}) => {
  // const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);

  return (
    <table
      className="table is-narrow is-fullwidth"
    >
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
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td
              className="is-vcentered"
            >
              {todo.id}
            </td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  'has-text-success',
                  { 'has-text-danger': !todo.completed },
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
                  onClickHandlerOpenModal(todo);
                  // setSelectedTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    { 'far fa-eye': selectedTodo !== todo },
                    { 'far fa-eye-slash': selectedTodo === todo },
                  )}
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
