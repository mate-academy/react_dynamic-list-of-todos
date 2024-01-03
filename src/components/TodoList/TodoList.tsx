import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[],
  setTodoId: (currentTodoId: number | null) => void,
  todoId: number | null,
  search: string,
  filter: Filter,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodoId,
  todoId,
  search,
  filter,
}) => {
  const [hoveredTodo, setHoveredTodo] = useState<null | number>(null);

  const filteredTodo = todos.filter(todo => {
    if (filter === Filter.active) {
      return !todo.completed;
    }

    if (filter === Filter.completed) {
      return todo.completed;
    }

    return todo;
  }).filter(todo => todo
    .title.toLowerCase().includes(search.toLowerCase()));

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
        {
          filteredTodo
            .map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                onMouseEnter={() => setHoveredTodo(todo.id)}
                onMouseLeave={() => setHoveredTodo(null)}
                className={classNames({
                  'has-background-info-light':
                    (todoId === todo.id) || (hoveredTodo === todo.id),
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {
                    todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )
                  }
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    onClick={() => setTodoId(todo.id)}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': !(todoId === todo.id),
                          'fa-eye-slash': todoId === todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};
