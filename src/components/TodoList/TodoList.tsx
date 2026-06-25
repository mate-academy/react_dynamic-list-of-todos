import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todoList: Todo[] | null;
  setSelectedTodo: (selectTodo: Todo) => void;
  selectedTodo: Todo | null;
};

const TodoListComponent: React.FC<Props> = ({
  todoList,
  setSelectedTodo,
  selectedTodo,
}) => {
  if (!todoList) {
    return null;
  }

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
        {todoList.map(todo => {
          const currentTodoId = selectedTodo?.id === todo.id;

          return (
            <tr data-cy="todo" key={todo.id}>
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
                  className={cn(todo.completed ? 'has-text-success' : 'has-text-danger')}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setSelectedTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i
                      className={
                        currentTodoId ? 'far fa-eye-slash' : 'far fa-eye'
                      }
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const TodoList = React.memo(TodoListComponent);
