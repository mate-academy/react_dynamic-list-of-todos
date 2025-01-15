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
  const [filteredTodo, setFilteredTodo] = useState<Todo[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos().then((fetchedTodo: Todo[]) => {
      setTodos(fetchedTodo);
      setFilteredTodo(fetchedTodo);
      setIsLoadingList(false);
    });
  }, []);

  const openTodoModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedTodoId(todo.id);
  };

  const closeTodoModal = () => {
    setSelectedTodo(null);
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onFilterChange={setFilteredTodo} />
            </div>

            <div className="block">
              {isLoadingList ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodo}
                  onTodoClick={openTodoModal}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={closeTodoModal} />
      )}
    </>
  );
};
