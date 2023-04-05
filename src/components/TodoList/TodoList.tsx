import { FC, memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  selectedTodoById: number;
  handleSelectedTodo: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = memo(({
  todos,
  handleSelectedTodo,
  selectedTodoById,
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
      {todos.map(({
        id,
        title,
        completed,
      }) => {
        const isSelectedTodo = selectedTodoById === id;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isSelectedTodo,
            })}
          >
            <td className="is-vcentered">{id}</td>

            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={classNames(
                'has-text-success',
                { 'has-text-danger': !completed },
              )}
              >
                {title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectedTodo(id)}
              >
                <span className="icon">
                  <i className={classNames({
                    'far fa-eye': !isSelectedTodo,
                    'far fa-eye-slash': isSelectedTodo,
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
));
