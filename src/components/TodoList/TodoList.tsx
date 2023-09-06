import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  modal: Todo | null;
  updateModal: (newTodo: Todo) => void
};

export const TodoList: React.FC<Props> = ({ todos, modal, updateModal }) => {
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
          const isPressed = modal ? modal.id === todo.id : false;

          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              isPressed={isPressed}
              updateModal={updateModal}
            />
          );
        })}
      </tbody>
    </table>
  );
};
