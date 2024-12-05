import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[],
  getTodo: (todo: Todo) => void,
  selectedTodo?: Todo | null,
}

export const TodoList: React.FC<Props> = React.memo(({ filteredTodos, getTodo, selectedTodo }) => {


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
        {filteredTodos.map((todo: Todo) => {
          const isSelectedTodo = todo.id === selectedTodo?.id;

          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => getTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far fa-eye${isSelectedTodo ? '-slash' : ''}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
});
