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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [option, setOption] = useState<string>('all');

  const closeModal = () => {
    setSelectedTodoId(0);
  };

  useEffect(() => {
    getTodos().then((todo) => setTodos(todo));
  }, []);

  let visibleTodos = todos;

  if (query) {
    const queryLowerCase = query.toLocaleLowerCase();

    visibleTodos = visibleTodos.filter((todo) => todo.title.toLocaleLowerCase().includes(queryLowerCase));
  }

  switch (option) {
    case 'active':
      visibleTodos = visibleTodos.filter((todo) => !todo.completed);
      break;
    case 'completed':
      visibleTodos = visibleTodos.filter((todo) => todo.completed);
      break;

    default:
      break;
  }

  const selectedTodo = visibleTodos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQuery={setQuery}
                option={option}
                setOption={setOption}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  onUserId={setSelectedTodoId}
                  selectedId={selectedTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal onCloseModal={closeModal} todo={selectedTodo} />
      )}
    </>
  );
};
