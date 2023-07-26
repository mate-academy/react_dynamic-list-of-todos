/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState('all');

  const getFilteredTodos = (visibleTodos: Todo[], visibleQuery: string, visibleSelect: string) => {
    let filteredTodo = [...visibleTodos];

    if (visibleQuery) {
      const normalQuery = visibleQuery.toLowerCase().trim();

      filteredTodo = filteredTodo.filter(
        todo => todo.title.toLowerCase().includes(normalQuery),
      );
    }

    switch (visibleSelect) {
      case 'completed':
        filteredTodo = filteredTodo.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodo = filteredTodo.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    return filteredTodo;
  };

  useEffect(() => {
    getTodos()
      .then((todoList) => getFilteredTodos(todoList, query, select))
      .then(setTodos);
  }, [query, select]);

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
                select={select}
                setSelect={setSelect}
              />
            </div>

            <div className="block">
              {!todos.length && (
                <Loader />
              )}
              <TodoList
                todos={todos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
