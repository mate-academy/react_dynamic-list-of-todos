import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setIsSelected: (isSelected: boolean) => void,
  setIsLoaded: (isLoaded: boolean) => void,
  setSelectedTodoId: (id: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  setIsSelected,
  setIsLoaded,
  setSelectedTodoId,
}) => {
  const handeleClick = (selected: Todo) => {
    setIsSelected(true);
    setSelectedTodoId(selected.id);

    window.setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  };

  return (
    <>
      {todos.length === 0
        ? ''
        : (
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
              {todos.map(todo => (
                <tr data-cy="todo" className="" key={todo.id}>
                  <td className="is-vcentered">{todo.userId}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={classNames(
                      todo.completed ? 'has-text-success' : 'has-text-danger',
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
                      onClick={() => handeleClick(todo)}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>

  );
};
