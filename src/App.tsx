import React, { useState, useEffect } from 'react';
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
  const [todoId, setTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
      });
  }, []);

  const preaperedSearchQuery = searchQuery.toLowerCase();

  const visibleTodo = todos.filter(todo => {
    const searchingTodo = todo.title.toLowerCase()
      .includes(preaperedSearchQuery);

    const swithCase = (value: string) => {
      switch (value) {
        case 'all':
          return todo;

        case 'active':
          return todo.completed === true;

        case 'completed':
          return todo.completed === false;
        default:
          break;
      }

      return value;
    };

    const filteredTodo = swithCase(filter);

    return searchingTodo && filteredTodo;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                searchQuery={setSearchQuery}
                filter={filter}
                filterTodo={setFilter}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodo}
                    selectedTodoId={todoId}
                    selectTodo={(value: number) => {
                      setTodoId(value);
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={todos}
          selectTodo={(value: number) => {
            setTodoId(value);
          }}
        />
      )}
    </>
  );
};
