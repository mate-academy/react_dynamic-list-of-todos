import React, { useEffect } from 'react';

interface TodoListProps {
  todos: Todo[];
  /* eslint-disable */

  users: User[];
  onShowTodoModal: (todo: Todo) => void;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onShowTodoModal,
}) => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // eslint-disable-next-line max-len
        const response = await fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json');
        const usersData = await response.json();

        console.log(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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
        {todos.map((todo) => (
          <tr
            key={todo.id}
            data-cy="todo"
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
              <p
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onShowTodoModal(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
