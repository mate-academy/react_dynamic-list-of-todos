import cn from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../State';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = React.memo(() => {
  const { filteredTodos, setSelectTodo, selectTodo } = useContext(TodosContext);

  const handleTodoModal = (selectedTodo: Todo) => {
    setSelectTodo(selectedTodo);
  };

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
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            className=""
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
              <p className={cn('has-text-success',
                { 'has-text-danger': !todo.completed })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">

              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleTodoModal(todo)}
              >

                <span className="icon">
                  <i className={cn({
                    'far fa-eye-slash': todo.id === selectTodo?.id,
                    'far fa-eye': todo.id !== selectTodo?.id,
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
