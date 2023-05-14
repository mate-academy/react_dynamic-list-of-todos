import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoElement } from '../TodoElement/TodoElement';

interface Props {
  todos: Todo[];
  userId: number | null;
  onSelect: (todo: Todo) => void;
}

export const TodoList: FC<Props> = memo((
  { todos, onSelect, userId },
) => {
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
        {todos.map(todo => {
          const { id } = todo;
          const isSelected = userId === id;

          return (
            <TodoElement
              todo={todo}
              onSelect={onSelect}
              isSelected={isSelected}
              key={id}
            />
          );
        })}
      </tbody>
    </table>
  );
});
