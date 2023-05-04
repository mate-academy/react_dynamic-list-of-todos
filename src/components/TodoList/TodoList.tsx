import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
// import { getTodos } from '../../api';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  // const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect(() => {
  //   getTodos().then(setTodos);
  // }, []);

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
          const { id, completed, title } = todo;
          const titleStatusClass = classNames({
            'has-text-danger': !completed,
            'has-text-success': completed,
          });

          return (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{id}</td>
              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p className={titleStatusClass}>
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    <i className="far fa-eye" />
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
