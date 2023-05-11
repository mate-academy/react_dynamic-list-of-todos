/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  selectedTodoCard: Todo | null;
  onSelectTodoCard: (todoCard: Todo) => void;
}

export const TodoList: FC<Props> = ({
  todos,
  selectedTodoCard,
  onSelectTodoCard,
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
          <th />
        </tr>
      </thead>

      <tbody>
        <TodoInfo
          todos={todos}
          selectedTodoCard={selectedTodoCard}
          onSelectTodoCard={onSelectTodoCard}
        />
      </tbody>
    </table>
  );
};
