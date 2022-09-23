import React from 'react';
import className from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  selectedTodoId: React.Dispatch<React.SetStateAction<number>>,
  selectedTodo: Todo | undefined,
  filteredTodos: Todo[]
  loading: boolean
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    filteredTodos, selectedTodo, selectedTodoId, loading,
  } = props;

  return (

    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
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
        {filteredTodos.map((todo) => {
          return (
            loading
              ? <Loader />
              : (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={className(selectedTodo
                    && selectedTodo.id === todo.id
                    && 'has-background-info-light')}
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
                    <p className={className(todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger')}
                    >
                      { todo.title }
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => selectedTodoId(todo.id)}
                    >
                      <span className="icon">
                        <i className={className(selectedTodo?.id === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye')}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              )
          );
        })}
      </tbody>
    </table>
  );
};
