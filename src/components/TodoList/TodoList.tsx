import React, { useContext, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext, FilterValue, StateContext } from '../../Store';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useContext(DispatchContext);
  const { todoInPopup, filterValue, searchQuery } = useContext(StateContext);

  const filteredTodos = useMemo(() => {
    const searchedTodos = todos.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    switch (filterValue) {
      case FilterValue.Completed:
        return searchedTodos.filter(todo => todo.completed);
      case FilterValue.Active:
        return searchedTodos.filter(todo => !todo.completed);

      default:
        return searchedTodos;
    }
  }, [filterValue, searchQuery, todos]);

  const handleTodoInPopup = (todoId: number) => {
    dispatch({
      type: 'setTodoInPopup',
      id: todoId,
    });
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
        {filteredTodos.map(todo => {
          const currentTodo = todoInPopup && todoInPopup.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames('', {
                'has-background-info-light': currentTodo,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <>
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                  <td className="is-vcentered is-expanded">
                    {todo.completed ? (
                      <p className="has-text-success">{todo.title}</p>
                    ) : (
                      <p className="has-text-danger">{todo.title}</p>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td className="is-vcentered" />
                  <td className="is-vcentered is-expanded">
                    <p className="has-text-danger">{todo.title}</p>
                  </td>
                </>
              )}
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleTodoInPopup(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': !currentTodo,
                        'fa-eye-slash': currentTodo,
                      })}
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
