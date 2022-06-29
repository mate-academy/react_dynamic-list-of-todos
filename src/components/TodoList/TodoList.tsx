import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.scss';
import { getTodos, getUser } from '../../api/api';
import { getTodosSelector } from '../../store/selectors';
import { setTodos, setUser } from '../../store';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodos(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const selectUser = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(setUser(userFromServer));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="TodoList__item TodoList__item--unchecked"
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                {`User ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
