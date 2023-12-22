import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodoContext } from '../context';

export const TodoList: React.FC = () => {
  const {
    setSelectedTodoData,
    visibleTodos,
    selectedTodoData,
  } = useTodoContext();

  const handleUserChange = (todo: Todo) => {
    setSelectedTodoData({ userId: todo.userId, todo });
  };

  const { todo } = selectedTodoData;

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
        {visibleTodos?.map(onetodo => {
          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': onetodo.id === todo?.id,
              })}
            >
              <td className="is-vcentered">{onetodo.id}</td>
              <td className="is-vcentered">
                {onetodo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-success': onetodo.completed,
                    'has-text-danger': !onetodo.completed,
                  })}
                >
                  {onetodo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleUserChange(onetodo)}
                >
                  <span className="icon">
                    <i className={classNames({
                      'far fa-eye': onetodo.id !== todo?.id,
                      'far fa-eye-slash': onetodo.id === todo?.id,
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
