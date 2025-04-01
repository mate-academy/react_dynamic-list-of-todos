/* eslint-disable no-console */
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
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterdQuery, setFiltredQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState<Todo>();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setVisibleTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const FiltredTitle = (str: string) => {
    setFiltredQuery(str);
  };

  const FiltredSelect = (str: string) => {
    setFilter(str);
  };

  useEffect(() => {
    let filtered = todos;

    if (filter === 'active') {
      filtered = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    if (filterdQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(filterdQuery.toLowerCase()),
      );
    }

    setVisibleTodos(filtered);
  }, [todos, filterdQuery, filter]);

  const handleSelectTodo = (todoId: Todo) => {
    setSelectedTodoId(todoId);
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
    // setSelectedTodoId();
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setValue={FiltredTitle} onSelected={FiltredSelect} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModal && (
        <TodoModal
          SelectTodoModal={selectedTodoId}
          closeModal={handleCloseModal}
        />
      )}
    </>
  );
};
