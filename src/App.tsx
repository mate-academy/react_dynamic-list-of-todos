/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';

export const checkTitle = (title: string, filterText: string) => {
  return title.toLowerCase().includes(filterText.toLowerCase());
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState(FilterType.All);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      const response = await getTodos();

      setLoading(false);
      setTodos(response);
    };

    loadTodos();
  }, []);

  const filterTodos = todos.filter(({ title, completed }) => {
    switch (filterValue) {
      case FilterType.Active:
        return !completed && checkTitle(title, filterText);

      case FilterType.Completed:
        return completed && checkTitle(title, filterText);

      default:
        return checkTitle(title, filterText);
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={filterValue}
                text={filterText}
                setFilterValue={setFilterValue}
                setFilterText={setFilterText}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  selectTodo={(todo) => setSelectedTodoId(todo)}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          todoId={selectedTodoId}
          todos={todos}
          selectTodo={setSelectedTodoId}
        />
      )}
    </>
  );
};
