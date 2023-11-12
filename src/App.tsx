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
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterValue, setFilterValue] = useState('all');

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
    setFilterValue('completed');
  };

  const handleFilterActive = () => {
    setFilterValue('active');
  };

  const handleFilterAll = () => {
    setFilterValue('all');
  };

  useEffect(() => {
    setTimeout(() => {
      getTodos().then((data) => {
        setLoading(false);
        setModalVisible(false);

        if (filterValue === 'completed') {
          setTodos(data.filter((todo) => todo.completed === true));
        } else if (filterValue === 'active') {
          setTodos(data.filter((todo) => todo.completed === false));
        } else {
          setTodos(data);
        }
      });
    }, 500);
  }, [filterValue]);

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
