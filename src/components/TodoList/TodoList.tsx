import { TodoListItem } from '../TodoListItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId?: Todo['id'];
  onOpenModal: (todo: Todo) => void;
}

export const TodoList = ({ todos, selectedTodoId, onOpenModal }: Props) => (
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
        <TodoListItem
          key={todo.id}
          todo={todo}
          selectedTodoId={selectedTodoId}
          onOpenModal={onOpenModal}
        />
      ))}
    </tbody>
  </table>
);
