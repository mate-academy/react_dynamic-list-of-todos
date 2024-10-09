/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { SelectOptions } from './types/SelectOptions';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  // #region initial todos and loading
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(tds => {
        const promises = tds.map(todo => {
          return getUser(todo.userId).then(user => ({
            ...todo,
            user,
          }));
        });

        return Promise.all(promises);
      })
      .then(todosWithUsers => {
        setTodos(todosWithUsers);
        setIsLoading(false);
      })
      .catch(error => {
        throw new Error('Error fetching todos or users:', error);
      });
  }, []);

  // #endregion

  // #region filter todos
  const [selectedOption, setSelectedOption] = useState<SelectOptions>('all');
  const [query, setQuery] = useState('');

  const filteredTodos = todos
    .filter(todo => {
      switch (selectedOption) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return false;
      }
    })
    .filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  // #endregion

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                onSelectChange={setSelectedOption}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={setSelectedTodo} />
      )}
    </>
  );
};
