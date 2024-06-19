/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import debounce from 'lodash.debounce';
import { TodoModal } from './components/TodoModal';

const getTodosByStatus = (status: string, todos: Todo[]) => {
  const preperedTodos = [...todos];

  if (status === 'active') {
    return preperedTodos.filter(todo => todo.completed === false);
  }

  if (status === 'completed') {
    return preperedTodos.filter(todo => todo.completed === true);
  }

  return preperedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [apliedQuery, setApliedQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(todos[0]);

  const applyQuery = useCallback(debounce(setApliedQuery, 300), []);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const statusTodos = getTodosByStatus(status, todos);

  const filteredTodos = statusTodos.filter(todo =>
    todo.title.toLowerCase().includes(apliedQuery.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={setStatus} onQueryChange={applyQuery} />
            </div>

            <div className="block">
              {todos.length <= 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setModalOpen={setIsModalOpen}
                  selectTodo={setSelectedTodo}
                  isOpen={isModalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal todo={selectedTodo} setIsOpen={setIsModalOpen} />
      )}
    </>
  );
};
