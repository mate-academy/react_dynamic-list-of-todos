import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  todoList: Todo[];
  handleSelectUser: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  handleSelectUser,
}) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [title, setTitle] = useState('');
  const [option, setOption] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(
    () => {
      setFilteredTodos(todoList.filter(todo => {
        if (todo.title.includes(title)) {
          switch (option) {
            case 'completed':
              return todo.completed;
            case 'active':
              return !todo.completed;
            default:
              return true;
          }
        }

        return false;
      }));
    },
    [title, option],
  );

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div>
        <label htmlFor="title-filter">Filter by title: </label>
        <input
          id="title-filter"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select
          onChange={event => {
            setOption(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={cn('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label>
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                onClick={() => {
                  handleSelectUser(todo.userId);
                  setSelectedTodoId(todo.id);
                }}
                className={cn(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                    selectedTodoId === todo.id,
                  },
                )}
                type="button"
              >
                {`User: ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
