import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  setHandle: Dispatch<SetStateAction<boolean>>,
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>,
  filter: string,
  searchText: string,
};

// eslint-disable-next-line max-len
export const TodoList: React.FC<Props> = ({ setHandle, setSelectedTodo, filter, searchText }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(json => {
      setTodos(json);
    });
  });

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return todo.title.includes(searchText);
    }

    if (filter === 'completed') {
      return todo.completed && todo.title.includes(searchText);
    }

    if (filter === 'active') {
      return !todo.completed && todo.title.includes(searchText);
    }

    return true;
  });

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

        {filteredTodos?.map(todo => {
          return (
            <tr
              key={todo.id}
              data-cy="todo"
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed === true
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    (todo.completed === true)
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                  // style={
                  //   (todo.completed === true)
                  //     ? { color: 'green' }
                  //     : { color: 'red' }
                  // }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={
                    () => {
                      setHandle(true);
                      setSelectedTodo(todo);
                    }
                  }
                >
                  <span className="icon">
                    <i className="far fa-eye" />
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
