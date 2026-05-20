import { TodoCard } from '../TodoCard/TodoCard';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
  todoSelected: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoSelect,
  todoSelected,
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
        {todos.map((item: Todo) => (
          <TodoCard
            key={item.id}
            todo={item}
            onTodoSelect={onTodoSelect}
            todoSelected={todoSelected}
          />
        ))}
      </tbody>
    </table>
  );
};
