/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

function getPreparedTodos(todos: Todo[], query: string) {
  let preparedTodos = [...todos];

  if (query) {
    const prepQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(
      todo => todo.title.toLowerCase().includes(prepQuery),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const visibleTodos = getPreparedTodos(todos, query);
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleOpenModal = (todo: Todo) => {
    setModalVisible(true);
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQueryDelete = () => {
    setQuery('');
  };

  const handleFilterCompleted = () => {
    const filteredTodos = originalTodos.filter((todo) => todo.completed === true);

    setTodos(filteredTodos);
  };

  const handleFilterActive = () => {
    const filteredTodos = originalTodos.filter((todo) => todo.completed === false);

    setTodos(filteredTodos);
  };

  const handleFilterAll = () => {
    setTodos(originalTodos);
  };

  useEffect(() => {
    setTimeout(() => {
      getTodos().then((todos) => {
        setTodos(todos);
        setOriginalTodos(todos);
        setLoading(false);
        setModalVisible(false);
      });
    }, 500);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQueryChange={handleQueryChange}
                query={query}
                handleQueryDelete={handleQueryDelete}
                handleFilterCompleted={handleFilterCompleted}
                handleFilterActive={handleFilterActive}
                handleFilterAll={handleFilterAll}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : <TodoList todos={visibleTodos} handleOpenModal={handleOpenModal} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && modalVisible && !loading && (
        <TodoModal
          // setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
          loading={loading}
          setLoading={setLoading}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};
