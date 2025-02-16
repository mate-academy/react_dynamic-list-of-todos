import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  choosedTodo: Todo | null;
  changeTodo: (item: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  choosedTodo,
  changeTodo,
}) => {
  // const [todoId, setTodoId] = useState<number | null>(null);

  const handleClick = (item: Todo) => {
    changeTodo(item);
  };

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
        {todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': id === choosedTodo?.id,
              })}
              key={id}
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
                <p
                  className={completed ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
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
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': id === choosedTodo?.id,
                        'fa-eye': id !== choosedTodo?.id,
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
};
