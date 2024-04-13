import React from 'react';
import cn from 'classnames';

import { getTodos } from '../../api';
import { useTodoState, useTodoDispatch } from '../TodoProvider';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const TodoList: React.FC = () => {
  const { todos, filter, query, selectedTodo, isLoadingTodos } = useTodoState();
  const dispatch = useTodoDispatch();

  React.useEffect(() => {
    dispatch({
      type: 'FETCH_TODOS',
    });
    getTodos().then(todosList =>
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        payload: todosList,
      }),
    );
  }, [dispatch]);

  if (isLoadingTodos) {
    return <Loader />;
  }

  const filteredTodos = todos.filter(todo => {
    const currFilter =
      filter === Filters.All ||
      (filter === Filters.Active && !todo.completed) ||
      (filter === Filters.Completed && todo.completed);

    const currQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return currFilter && currQuery;
  });

  const handleSelectTodo = (todo: Todo) => {
    dispatch({
      type: 'SET_SELECTED_TODO',
      payload: todo,
    });
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
          {filteredTodos.map(todo => {
            const { id, completed, title } = todo;

            return (
              <tr data-cy="todo" key={id}>
                {/*has-background-info-light*/}
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  <span className="icon" data-cy={completed ? 'iconCompleted' : ''}>
                    <i className={cn('fas', { 'fa-check': completed })} />
                  </span>
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'far',
                          {
                            'fa-eye': id !== selectedTodo?.id,
                          },
                          {
                            'fa-eye-slash': id === selectedTodo?.id,
                          },
                        )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default React.memo(TodoList);
