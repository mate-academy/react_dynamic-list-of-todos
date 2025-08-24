import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';
type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  selectedTodo,
}) => {
  return (
    <>
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
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                onSelectTodo={onSelectTodo}
                selectedTodo={selectedTodo}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
