import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  showModal: (userId: number, todo: Todo) => void;
}

export const TodoList: FC<Props> = memo(({
  todos,
  selectedTodo,
  showModal,
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
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            selectedTodo={selectedTodo}
            showModal={showModal}
          />
        );
      })}
    </tbody>
  </table>
));
