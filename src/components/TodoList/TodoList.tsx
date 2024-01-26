import React, { useContext } from 'react';
import cn from 'classnames';

import {
  DispatchContext,
  StateContext,
} from '../../management/TodoContextProvider';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const {
    todos,
    currentTodo,
    filterBy,
    query,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const hendleClickEye = (todo: Todo) => {
    dispatch({
      type: 'clickEye',
      item: todo,
      slash: true,
    });
  };

  const filteredTodos = () => {
    let filterTodos = todos;

    if (query) {
      filterTodos = filterTodos
        .filter(todo => todo.title.toLowerCase()
          .includes(query.toLowerCase()));
    }

    switch (filterBy) {
      case Filter.active:
        return filterTodos.filter(todo => !todo.completed);

      case Filter.completed:
        return filterTodos.filter(todo => todo.completed);

      default:
        return filterTodos;
    }
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
        {filteredTodos().map(todo => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': currentTodo?.id === todo.id,
            })}
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
              <p className={cn({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => hendleClickEye(todo)}
              >
                <span className="icon">
                  <i className={cn({
                    'far fa-eye-slash': currentTodo?.id === todo.id,
                    'far fa-eye': currentTodo?.id !== todo.id,
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
};
