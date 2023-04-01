/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
// eslint-disable-next-line import/no-cycle
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export enum FilterBySelect {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filterTodos(todos: Todo[], filterBy: string): Todo[] {
  switch (filterBy) {
    case 'active':
      return todos.filter(todo => !todo.completed);

    case 'completed':
      return todos.filter(todo => todo.completed);

    default:
      return [...todos];
  }
}

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filterBySelect, setFilterBySelect] = useState('all');
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(allTodos[0]);

  useEffect(() => {
    getTodos().then(todos => setAllTodos(todos));
  }, []);

  const getVisibleTodos = () => {
    const visibleTodos = allTodos.filter(todo => {
      const lowerCaseTodo = todo.title.toLocaleLowerCase();

      return lowerCaseTodo.includes(query.toLocaleLowerCase());
    });

    return filterTodos(visibleTodos, filterBySelect);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBySelect={filterBySelect}
                onSetQuery={setQuery}
                onSetFilterBySelect={setFilterBySelect}
              />
            </div>

            {allTodos.length === 0
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    todos={getVisibleTodos()}
                    onSetUserId={setUserId}
                    currentUserId={userId}
                    onsetSelectedTodo={setSelectedTodo}
                  />
                </div>
              )}

          </div>
        </div>
      </div>
      {userId
      && (
        <TodoModal
          onSetUserId={setUserId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
