import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../react-app-env';
import { getAllTodos } from '../../api/todos';
import { loadTodosAction, loadUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';
import { getUserById } from '../../api/user';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state: State) => state.todos);

  const user = useSelector(getUserSelector);

  const loadUser = async (userId: number) => {
    const userFromServer = await getUserById(userId);

    dispatch(loadUserAction(userFromServer));
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getAllTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  // eslint-disable-next-line no-console
  console.log(user);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => loadUser(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
