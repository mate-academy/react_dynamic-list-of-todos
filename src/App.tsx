/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [visibleToDos, setVisibleToDos] = useState<Todo[]>([]);
  const [select, setSelect] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const isMatch = (str: string) => str.toLowerCase().includes(query.toLowerCase());

  const getSelectedTodos = (todos: Todo[]) => {
    const filteredTodos = todos.filter(({ completed, title }) => {
      switch (select) {
        case 'active':
          return !completed && isMatch(title);

        case 'completed':
          return completed && isMatch(title);

        default:
          return isMatch(title);
      }
    });

    setVisibleToDos(filteredTodos);
  };

  useEffect(() => {
    getTodos()
      .then(todos => getSelectedTodos(todos));
  }, [select, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setSelect}
                selectValue={select}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {visibleToDos.length || query
                ? (
                  <TodoList
                    todos={visibleToDos}
                    chooseTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          deleteSelection={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
