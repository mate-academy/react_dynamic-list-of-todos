import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
  showDatails: (todo: Todo) => void,
};

export const TodoList: FC<Props> = ({ todos, showDatails }) => (
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
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames({
            'has-background-info-light': false,
          })}
        >
          <TodoInfo todo={todo} onDatails={showDatails} />
        </tr>
      ))}
    </tbody>
  </table>
);
