import classnames from 'classnames';
import React, { useState, useEffect } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  filterValue: string,
  selectedValue: string,
  random: number,
  selectId: (userId:number) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  selectId,
  selectedValue,
  random,
  filterValue,
}) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const copyTodo = [...todos]
      .filter(todo => todo.title.includes(filterValue))
      .filter(todo => {
        switch (selectedValue) {
          case 'all':
            return true;
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          default:
            return true;
        }
      });

    if (random !== 0) {
      copyTodo.sort(() => 0.5 - Math.random());
    }

    setVisibleTodos(copyTodo);
  }, [filterValue, todos, selectedValue, random]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classnames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label htmlFor={todo.id.toString()}>
                <input
                  id={todo.id.toString()}
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classnames(
                  'TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': (todo.userId === selectedUserId) },
                )}
                type="button"
                onClick={() => selectId(todo.userId)}
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
