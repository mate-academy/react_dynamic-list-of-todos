import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(visibleTodos => setTodos(visibleTodos));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const filterTitle = todo.title
        .toLowerCase()
        .includes(input.toLowerCase());

      switch (filterType) {
        case 'active':
          return !todo.completed && filterTitle;
        case 'completed':
          return todo.completed && filterTitle;
        default:
          return filterTitle;
      }
    });
  }, [todos, input, filterType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                onFilterTypeChange={setFilterType}
                inputValue={input}
                onInputValueChange={setInput}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  handleTodoSelection={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
