import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { FilteringMode } from '../../types/FilteringMode';

interface Props {
  setIsLoading: (arg0: boolean) => void;
  setInspectedTodo: (arg0: Todo | null) => void;
  filteringMode: FilteringMode;
  searchQuery: string;
  inspectedTodo: Todo | null;
}

export const TodoList: React.FC<Props>
  = ({
    setIsLoading, setInspectedTodo, filteringMode, searchQuery, inspectedTodo,
  }) => {
    const [todos, setTodos] = useState<Todo[] | null>(null);

    useEffect(() => {
      getTodos()
        .then(fetchedTodos => setTodos(fetchedTodos))
        .finally(() => setIsLoading(false));
    }, []);

    const handleFiltering = (todosArg: Todo[] | null) => {
      let filteredTodos: Todo[] = [];

      if (todosArg === null) {
        return null;
      }

      switch (filteringMode) {
        case FilteringMode.Active:
          filteredTodos = todosArg?.filter(todo => !todo.completed);
          console.log('filtering undone!');
          break;
        case FilteringMode.Completed:
          filteredTodos = todosArg?.filter(todo => todo.completed);
          console.log('filtering done!');
          break;
        case FilteringMode.All:
          filteredTodos = todosArg;
          console.log('not filtering!');
          break;
        default:
      }

      console.log(filteringMode);
      console.log(todos);
      console.log(filteredTodos);
      console.log(typeof filteringMode);

      return filteredTodos.filter(todo => todo.title.toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()));
    };

    return (
      <table className="table is-narrow is-fullwidth">

        {todos && (
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
        )}

        <tbody>
          {handleFiltering(todos)?.map((todo: Todo) => {
            return (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  <span className="icon">
                    {todo.completed
                    && <i data-cy="iconCompleted" className="fas fa-check" />}
                  </span>
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames({
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
                    onClick={() => setInspectedTodo(todo)}
                  >
                    <span className="icon">
                      <i className={classNames({
                        far: true,
                        'fa-eye-slash': inspectedTodo?.id === todo.id,
                        'fa-eye': !(inspectedTodo?.id === todo.id),
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
