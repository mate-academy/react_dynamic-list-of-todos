/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.all);
  const [todoSearchValue, setTodoSearchValue] = useState('');

  useEffect(() => {
    const setTodosFromServer = async () => {
      try {
        const allTodos = await getTodos();

        setTodos(allTodos);
      } catch (error) {
        throw new Error('error');
      } finally {
        setIsLoading(false);
      }
    };

    setTodosFromServer();
  }, []);

  const filteredTodos = useMemo(() => {
    const selectedTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.completed:
          return todo.completed;

        case FilterBy.active:
          return !todo.completed;

        default:
          return todos;
      }
    });

    if (todoSearchValue) {
      const normalizedValue = todoSearchValue.toLowerCase();

      return selectedTodos.filter(todo => todo.title.toLowerCase().includes(normalizedValue));
    }

    return selectedTodos;
  }, [todos, filterBy, todoSearchValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearchInput={setTodoSearchValue}
                todoSearchValue={todoSearchValue}
                onSelectValue={setFilterBy}
                filterBy={filterBy}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
