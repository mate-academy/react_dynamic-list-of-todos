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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [option, setOption] = useState('all');
  const [filterText, setFilterText] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setAllTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let todos = allTodos;

    if (option === 'completed') {
      todos = todos.filter(todo => todo.completed);
    } else if (option === 'active') {
      todos = todos.filter(todo => !todo.completed);
    }

    if (filterText) {
      todos = todos.filter(todo => todo.title.includes(filterText));
    }

    setFilteredTodos(todos);
  }, [option, filterText, allTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setOption={setOption}
                option={option}
                setFilterText={setFilterText}
                filterText={filterText}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  setUserId={setUserId}
                  setShowModal={setShowModal}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          setShowModal={setShowModal}
          userId={userId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
