/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

// import { User } from './types/User';

// function getTodos() {
//   return fetch('http://localhost:5173/api/todos.json').then(response => {
//     return response.json();
//   });
// }

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectOption, setSelectOption] = useState('all');
  const [query, setQuery] = useState('');
  // const [clearSearch, setClearSearch] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        let filteredTodos = todosFromServer;

        if (selectOption === 'active') {
          filteredTodos = filteredTodos.filter((todo: Todo) => !todo.completed);
        } else if (selectOption === 'completed') {
          filteredTodos = filteredTodos.filter((todo: Todo) => todo.completed);
        }

        if (query !== '') {
          setVisibleButton(true);
          // setClearSearch(false);
          filteredTodos = filteredTodos.filter((todo: Todo) =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
        }

        // if (clearSearch) {
        //   setQuery('');
        //   setVisibleButton(false);
        // }

        setTodos(filteredTodos);
      })
      .finally(() => setLoading(false));
  }, [selectOption, query]);

  const resetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const handleClearSearchButton = () => {
    // setClearSearch(true);
    setQuery('');
    setVisibleButton(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectOption={setSelectOption}
                handleSearchChange={setQuery}
                clearSearchButton={handleClearSearchButton}
                value={query}
                buttonStatus={visibleButton}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                onSelect={setSelectedTodo}
                selectedTodoId={selectedTodo?.id}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={resetSelectedTodo} />
      )}
    </>
  );
};
