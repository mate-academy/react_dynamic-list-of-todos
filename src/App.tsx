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
import { selectedOption } from './helpers/helpers';

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [complitedFilter, setComplitedFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todo => setTodo(todo));
  }, []);

  const selectedTodo = (
    todos.find(todo => todo.id === selectedTodoId)
  );

  const onCloseModal = () => {
    setSelectedTodoId(0);
  };

  const preaperedSearchQuery = searchQuery.toLowerCase();

  const filterTodosByComplited = todos.filter(todo => {
    const serchingQuery = todo.title.toLowerCase().includes(preaperedSearchQuery);

    const filteredTodo = selectedOption(complitedFilter, todo);

    return serchingQuery && filteredTodo;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                complitedFilter={complitedFilter}
                setComplitedFilter={setComplitedFilter}
              />
            </div>

            <div className="block">
              {filterTodosByComplited.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={filterTodosByComplited}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};
