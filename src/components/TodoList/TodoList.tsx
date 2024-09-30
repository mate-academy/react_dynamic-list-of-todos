import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

export interface TodoListProps {
  selected: Todo | null;
  onSelected: (todo: Todo | null) => void;
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({
  selected,
  onSelected,
  todos,
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
        {todos.map(toDo => (
          <TodoItem
            key={toDo.id}
            selected={selected}
            onSelected={onSelected}
            toDo={toDo}
          />
        ))}
      </tbody>
    </table>
  );
};
