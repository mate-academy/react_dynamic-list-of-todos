/* eslint-disable max-len */
import React, { useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterTypes';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState<FilterType>(FilterType.all);

  React.useEffect(() => {
    setIsLoading(true);

    getTodos().then((todosData: Todo[]) => {
      setTodos(todosData);
      setFilteredTodos(todosData);
      setIsLoading(false);
    });
  }, []);

  const filterTodos = useCallback(() => {
    let filtered = todos;

    switch (filter) {
      case FilterType.active:
        filtered = todos.filter(todo => !todo.completed);
        break;
      case FilterType.completed:
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(todo => {
        return todo.title
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });
    }

    setFilteredTodos(filtered);
  }, [todos, searchTerm, filter]);

  React.useEffect(() => {
    filterTodos();
  }, [filterTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectFilter={(value: FilterType) => {
                  setFilter(value);
                }}
                onSearch={(value: string) => {
                  setSearchTerm(value);
                }}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={todo => setSelectedTodo(todo)}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
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
