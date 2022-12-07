/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState('All');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    const getTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    };

    getTodosFromServer();
  }, []);

  const filterTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'All':
        return todo;

      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return 0;
    }
  });

  const displayedTodos = filterTodos.filter(todo => {
    return todo.title.includes(query.trim().toLowerCase());
  });

  // console.log(userId, 'userId from state');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filterBy={filterBy}
                onFilterChange={setFilterBy}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList
                todos={displayedTodos}
                selectedTodoId={selectedTodoId}
                onSetSelectedTodoId={setSelectedTodoId}
                onSetUserId={setUserId}
              />
            </div>
          </div>
        </div>
      </div>
      {userId !== 0 && (
        <TodoModal
          userId={userId}
          todos={todos}
          onSetUserId={setUserId}
          selectedTodoId={selectedTodoId}
          onSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
