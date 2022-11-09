import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortTypes } from './types/SortTypes';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(SortTypes.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(response => setTodoList(response));
  }, []);

  const searchFilter = () => {
    const queryInLowerCase = query.toLowerCase();

    return todoList.filter(
      todo => todo.title.toLowerCase().includes(queryInLowerCase),
    );
  };

  const selectFilter = () => {
    const list = searchFilter();

    switch (sortBy) {
      case SortTypes.Active:
        return list.filter(todo => !todo.completed);
      case SortTypes.Completed:
        return list.filter(todo => todo.completed);
      default:
        return list;
    }
  };

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  const handleChangeSortType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortBy(event.target.value as SortTypes);
  };

  const handleSelectTodo = (value: Todo | null) => {
    setSelectedTodo(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={handleQuery}
                query={query}
                sortBy={sortBy}
                onChangeSortType={handleChangeSortType}
              />
            </div>

            <div className="block">
              {!todoList.length
                ? <Loader />
                : (
                  <TodoList
                    getVisibleTodos={selectFilter}
                    onSelectTodo={handleSelectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          onSelectTodo={handleSelectTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
