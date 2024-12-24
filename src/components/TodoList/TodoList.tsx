import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  filterTodos: Todo[];
  setModal: (value: boolean) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  filterTodos,
  setModal,
  selectedTodo,
  setSelectedTodo,
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
        {filterTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setModal={setModal}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
