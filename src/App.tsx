import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterOptions, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<FilterOptions>('all');
  const [errorMessage, setErrorMessage] = useState(false);
  const [query, setQuery] = useState('');
  const [loadingTodoFilter, setLoadingTodoFilter] = useState(true);
  const [showTodoModal, setShowTodoModal] = useState(false);

  const filterList = todos.filter(todo => {
    if (selectedOption === 'active') {
      return todo.completed === false;
    }

    if (selectedOption === 'completed') {
      return todo.completed === true;
    }

    return true;
  });

  const visibleList = filterList.filter(todo => {
    return todo.title.toLowerCase().includes(query.toLocaleLowerCase());
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoadingTodoFilter(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                query={query}
                setQuery={setQuery}
                onFilterChange={setSelectedOption}
              />
            </div>

            <div className="block">
              {loadingTodoFilter && <Loader />}
              {errorMessage && (
                <p style={{ color: 'red', fontSize: '22px' }}>
                  Opps something wrong, please try again later!!!
                </p>
              )}
              {!loadingTodoFilter && !errorMessage && (
                <TodoList
                  todos={visibleList}
                  selectedTodo={selectedTodo}
                  selectTodo={setSelectedTodo}
                  showModal={setShowTodoModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showTodoModal && (
        <TodoModal
          showModal={setShowTodoModal}
          selectedTodo={selectedTodo}
          resetSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
