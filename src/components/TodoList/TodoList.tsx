import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  setIsOpenModal: (newValue: boolean) => void;
  setSelectedTodo: (newValue: Todo | null) => void;
  selectedTodo: Todo | null;
  isOpenModal: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIsOpenModal,
  setSelectedTodo,
  selectedTodo,
  isOpenModal,
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
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={selectedTodo?.id === todo.id}
            onSelect={(selectedTodoItem) => {
              setIsOpenModal(true);
              setSelectedTodo(selectedTodoItem);
            }}
            isOpenModal={isOpenModal}
          />
        ))}
      </tbody>
    </table>
  );
};
