import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectUser: (id: number, todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => (

  <table
    data-cy="listOfTodos"
    className="table is-narrow is-fullwidth"
  >

    <tbody>
      {todos.map(todo => (
        <tr
          className={todo.completed
            ? ('has-background-success-light has-text-success')
            : ('has-background-danger-light has-text-danger')}
          key={todo.id}
        >
          <td className="is-vcentered">
            <span className="icon is-size-5">
              <i className={todo.completed
                ? ('fas fa-check-square')
                : ('fas fa-square-xmark')}
              />
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            {todo.title}
          </td>
          <td className="has-text-right is-vcentered">
            <button
              className="button is-warning"
              type="button"
              onClick={() => {
                selectUser(todo.userId, todo.id);
              }}
            >
              Show
              {' '}
              {todo.userId}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
