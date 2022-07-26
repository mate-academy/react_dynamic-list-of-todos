import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  onSelectTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  onSetModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  onSetModalVisibility,
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
        <tr
          data-cy="todo"
          key={todo.id}
        >
          <TodoInfo todo={todo} />

          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => {
                onSelectTodo(todo);
                onSetModalVisibility(true);
              }}
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
