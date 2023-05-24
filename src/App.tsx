/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

import { Todo } from './types/Todo';

import { useTodos, SearchQueries } from './hooks/useTodos';

const initialQueries: SearchQueries = {
  searchInput: '',
  searchSelect: 'all',
};

export const App = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQueries, setSearchQueries]
    = useState<SearchQueries>(initialQueries);
  const [loading, setLoading] = useState(true);

  const filteredTodos = useTodos(searchQueries);

  useEffect(() => {
    if (filteredTodos.length > 0) {
      setLoading(false);
    }
  }, [filteredTodos]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setSearchQueries((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearSearchInput = () => {
    setSearchQueries((prevState) => ({
      ...prevState,
      searchInput: '',
    }));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={onChange}
                onClear={clearSearchInput}
                inputValue={searchQueries.searchInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
