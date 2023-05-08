import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todoStatusFilter, setTodoStatusFilter] = useState(TodoStatus.All);
  const [query, setQuery] = useState('');

  const onTodoModalClose = () => {
    setSelectedTodoId(0);
  };

  useEffect(() => {
    getTodos().then(todos => {
      let filteredTodos = todos;

      switch (todoStatusFilter) {
        case TodoStatus.All:
          break;

        case TodoStatus.Active:
          filteredTodos = filteredTodos.filter(todo => !todo.completed);
          break;

        case TodoStatus.Complited:
          filteredTodos = filteredTodos.filter(todo => todo.completed);
          break;

        default: throw new Error('Wrong todo status');
      }

      if (query) {
        const lowerQuery = query.toLowerCase().trim();

        filteredTodos = filteredTodos
          .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
      }

      setVisibleTodos(filteredTodos);
    });
  }, [todoStatusFilter, query]);

  const selectedTodo = selectedTodoId
    ? visibleTodos.find(todo => todo.id === selectedTodoId)
    : null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                todoStatusFilter={todoStatusFilter}
                setTodoStatusFilter={setTodoStatusFilter}
              />
            </div>

            <div className="block">
              {visibleTodos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          handleClosing={onTodoModalClose}
        />
      )}
    </>
  );
};
