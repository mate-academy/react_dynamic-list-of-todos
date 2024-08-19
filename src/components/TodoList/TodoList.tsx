import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';
import cn from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
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
            <tr data-cy="todo" key={todo.id} className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
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
                  onClick={() => handleTodoClick(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': selectedTodo?.id !== todo.id,
                        'fa-eye-slash': selectedTodo?.id === todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
