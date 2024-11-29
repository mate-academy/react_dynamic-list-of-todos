import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { filteringTodo } from './services/filteringTodos';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [query, setQuery] = useState('');
  const [selectFiltering, setselectFiltering] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(todoList);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      try {
        const todos = await getTodos();

        setTodoList(todos);
        setFilteredTodos(todos);
      } catch (err) {
        setTodoList(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value.trim().toLowerCase());
  };

  const handleSelectChange = (value: string) => {
    setselectFiltering(value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    const todos = filteringTodo(todoList, query, selectFiltering);

    setFilteredTodos(todos || []);
  }, [query, selectFiltering, todoList]);

  const showTodoDetails = (id: number) => {
    if (!todoList) {
      return;
    }

    const todo1 = todoList.find(todo => todo.id === id);

    if (todo1) {
      setSelectedTodo(todo1);
      setIsActive(true);
    }
  };

  const closeModal = () => {
    setIsActive(false);
    setSelectedTodo(null);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              query={query}
              handleQueryChange={handleQueryChange}
              handleSelectChange={handleSelectChange}
              resetQuery={resetQuery}
            />
          </div>

          <div className="block">
            {isLoading && <Loader />}

            {filteredTodos && (
              <TodoList
                todoList={filteredTodos}
                selectedTodo={selectedTodo}
                showTodoDetails={showTodoDetails}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodo && isActive && (
        <TodoModal
          id={selectedTodo.id}
          title={selectedTodo.title}
          completed={selectedTodo.completed}
          userId={selectedTodo.userId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
