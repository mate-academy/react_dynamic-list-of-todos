import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  activeId: number;
  setActiveId: (id: number) => void;
};

export const TodoList: FC<Props> = ({
  todos,
  activeId,
  setActiveId,
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
        {todos.map(todo => (
          <TodoInfo
            key={todo.id}
            todo={todo}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </tbody>
    </table>
  );
};
