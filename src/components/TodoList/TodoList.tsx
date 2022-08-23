import React from 'react';
import { Maybe } from '../../types/Maybe';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectTodo: (todo: Todo) => void;
  selectedId: Maybe<number>;
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, selectTodo, selectedId } = props;

  const isSelected = (todoId: number) => todoId === selectedId;

  return (
    <>
      {todos.length === 0
        ? 'No todos yet'
        : (
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
                  className={
                    isSelected(todo.id)
                      ? 'has-background-info-light'
                      : ''
                  }
                  key={todo.id}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
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
                      onClick={() => selectTodo(todo)}
                    >
                      <span className="icon">
                        <i className={`far fa-eye${isSelected(todo.id) ? '-slash' : ''}`} />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
