/* eslint-disable no-console */

import './TodoList.scss';
import {
  FC, memo, useCallback, useEffect, useState,
} from 'react';
import { TodoItem } from '../TodoItem';
import { SelectOptions } from '../../enums/SelectOptions';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = memo(({ todos }) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState(String(SelectOptions.All));
  const [processedTodos, setProcessedTodos] = useState<Todo[]>(todos);

  const queryContains = useCallback((title: string) => (
    title.toLowerCase().includes(query.toLowerCase())
  ), [todos, query, option]);

  useEffect(() => {
    const getProcessedTodos = (): Todo[] => (
      todos.filter(({ title, completed }) => {
        switch (option) {
          case SelectOptions.All:
            return queryContains(title);
          case SelectOptions.Completed:
            return queryContains(title) && completed;
          case SelectOptions.Active:
            return queryContains(title) && !completed;
          default:
            return false;
        }
      })
    );

    setProcessedTodos(getProcessedTodos);
  }, [todos, query, option]);

  return (
    <div className="TodoList">
      <h2>Todos</h2>

      <div className="TodoList__controllers">
        <label>
          <input
            type="text"
            placeholder="Enter your todo..."
            autoComplete="off"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
          />
        </label>

        <select
          value={option}
          onChange={({ target }) => setOption(target.value)}
        >
          {Object.keys(SelectOptions).map(selectOption => (
            <option
              key={selectOption}
              value={selectOption}
            >
              {selectOption}
            </option>
          ))}
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {processedTodos.map(({
            id, userId, title, completed,
          }) => (
            <TodoItem
              key={id}
              userId={userId}
              title={title}
              completed={completed}
            />
          ))}
        </ul>
      </div>
    </div>
  );
});
