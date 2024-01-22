import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  visibleTodos: Todo[],
};

export const TodoList: React.FC<Props> = React.memo(({ visibleTodos }) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodosContext);

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
        {visibleTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={cn({ 'has-background-info-light': selectedTodo })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                {todo.completed && (
                  <i className="fas fa-check" />
                )}
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i className={cn('far', {
                    'fa-eye-slash': selectedTodo?.id === todo.id,
                    'far fa-eye': selectedTodo !== todo,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
