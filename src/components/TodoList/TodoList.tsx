import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelect: (value: Todo | null) => void;
}

export const TodoList: FC<Props> = ({
  todos,
  selectedTodo,
  onSelect,
}) => (
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
          todo={todo}
          selectedTodo={selectedTodo}
          onSelect={onSelect}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
