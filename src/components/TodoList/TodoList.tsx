import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  selectedTodo: Todo | null;
  todos: Todo[];
  onSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodo,
}) => {
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
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSelect={onSelect}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
