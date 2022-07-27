import { Button } from 'react-bulma-components';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectUser: (id: number, todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => (

  <table
    data-cy="listOfTodos"
    className="table is-fullwidth"
  >

    <tbody>
      {todos.map(todo => (
        <tr
          className={todo.completed
            ? ('has-background-green-light has-text-success')
            : ('has-background-black-light has-text-black')}
          key={todo.id}
        >
          <td className="is-vcentered">
            <span className="icon is-size-2">
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
            <Button
              color="danger"
              rounded
              outlined
              type="button"
              onClick={() => {
                selectUser(todo.userId, todo.id);
              }}
            >
              Show
              {' '}
              {todo.userId}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
