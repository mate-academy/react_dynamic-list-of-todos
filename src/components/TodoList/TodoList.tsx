import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getTodos } from '../../api/api';
import './TodoList.scss';

type Props = {
  selectedUser: (userId: number) => void,
};

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

export const TodoList: React.FC<Props> = ({ selectedUser }) => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [showTodos, setShowTodos] = useState<Todo[]>([]);
  const [completTodos, setCompletTodos] = useState('all');

  const getAllTodos = async () => {
    const allTodos = await getTodos();

    setTodosList(allTodos);
    setShowTodos(allTodos);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    setShowTodos((
      todosList.filter(todo => todo.title.includes(filterTitle))
    ));
  }, [filterTitle]);

  useEffect(() => {
    if (completTodos === 'active') {
      setShowTodos((
        todosList.filter(todo => !todo.completed)
      ));
    } else if (completTodos === 'comleted') {
      setShowTodos((
        todosList.filter(todo => todo.completed)
      ));
    } else {
      setShowTodos(todosList);
    }
  }, [completTodos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filter">
        <label>
          Title filter
          {' '}
          <input
            type="text"
            data-cy="filterByTitle"
            onChange={(e) => {
              setFilterTitle(e.currentTarget.value);
            }}
          />
        </label>

        <label>
          Todo completed
          {' '}
          <select
            name="completed"
            value={completTodos}
            onChange={(e) => {
              setCompletTodos(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Not completed</option>
            <option value="completed">Completed</option>
          </select>
        </label>

      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {showTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked',
              )}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                data-cy="userButton"
                onClick={() => {
                  selectedUser(todo.userId);
                }}
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
