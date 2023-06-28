/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { FilterTodoState } from './types/FilterTodoState';
import { filterTodoByStatus, filterTodoByTitle } from './helpers/todoFilters';
import { getFilteredBy } from './helpers/getFilteredBy';

const initialFormState: FilterTodoState = {
  todoStatus: TodoStatus.All,
  searchQuery: '',
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo []>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filterState, setFilterState] = useState<FilterTodoState>(initialFormState);

  const { searchQuery, todoStatus } = filterState;

  useEffect(() => {
    setLoading(true);
    getTodos().then(responce => {
      setTodos(responce);
      setLoading(false);
    });
  }, []);

  const updateFormState = (key: string, value: string | TodoStatus) => {
    setFilterState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectedTodo = todos
    .find(todo => todo.id === selectedTodoId);

  const filters = [];

  if (searchQuery) {
    filters.push(filterTodoByTitle(searchQuery));
  }

  if (todoStatus !== TodoStatus.All) {
    filters.push(filterTodoByStatus(todoStatus));
  }

  const visibleTodos = getFilteredBy(todos, ...filters);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeFormState={updateFormState}
                formState={filterState}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodoId={(id) => setSelectedTodoId(id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={(id) => setSelectedTodoId(id)}
        />
      )}
    </>
  );
};
