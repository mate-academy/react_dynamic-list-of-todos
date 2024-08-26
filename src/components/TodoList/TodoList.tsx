import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoPost } from '../Todo/TodoPost';

type Props = {
  todos: Todo[];
  handleEyeClick: (todoId: number) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleEyeClick,
  selectedTodoId,
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
        <TodoPost
          todo={todo}
          handleEyeClick={handleEyeClick}
          selectedTodoId={selectedTodoId}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);

// success

{
  /* <tr data-cy="todo" className="has-background-info-light">
<td className="is-vcentered">2</td>
<td className="is-vcentered" />
<td className="is-vcentered is-expanded">
  <p className="has-text-danger">quis ut nam facilis et officia qui</p>
</td>
<td className="has-text-right is-vcentered">
  <button data-cy="selectButton" className="button" type="button">
    <span className="icon">
      <i className="far fa-eye-slash" />  ---- утт замкнуте око
    </span>
  </button>
</td>
</tr> */
}
