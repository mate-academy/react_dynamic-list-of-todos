import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  data: Todo[];
  activeTodo: undefined | Todo;
  setActiveTodo: Dispatch<SetStateAction<undefined | Todo>>;
}

export const TodoList: React.FC<Props> = ({
  data,
  activeTodo,
  setActiveTodo,
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
        {data.map(elem => (
          <TodoItem
            item={elem}
            activeTodo={activeTodo}
            setActiveTodo={setActiveTodo}
            key={elem.id}
          />
        ))}
      </tbody>
    </table>
  );
};
