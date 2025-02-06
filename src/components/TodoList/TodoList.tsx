import { TodoLine } from '../TodoLine/TodoLine';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  electTodoId: number;
  onElectTodoId: React.Dispatch<React.SetStateAction<number>>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  electTodoId,
  onElectTodoId,
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
        {todos.map((todo: Todo) => (
          <TodoLine
            key={todo.id}
            todo={todo}
            isSelected={electTodoId === todo.id}
            onElectTodoId={onElectTodoId}
          />
        ))}
      </tbody>
    </table>
  );
};
