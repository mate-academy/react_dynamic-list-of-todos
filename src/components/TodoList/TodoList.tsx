import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  currentTodo: Todo | null,
  isModalVisible: boolean,
  onModalBtn: (currentTodo: Todo | null) => void,
}

export const TodoList: FC<Props> = (props) => {
  const {
    todos,
    currentTodo,
    isModalVisible,
    onModalBtn: onModalButton,
  } = props;

  const isChosenTodo = (todoId: number): boolean => {
    return currentTodo?.id === todoId;
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
        {todos.map((todo, index) => {
          const {
            id,
            title,
            completed,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className={cn(
                { 'has-background-info-light': index % 2 === 0 },
              )}
              key={id}
            >
              <td className="is-vcentered">
                {id}
              </td>

              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onModalButton(todo)}
                >
                  <span className="icon">
                    <i className={
                      isChosenTodo(todo.id) && isModalVisible
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
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
