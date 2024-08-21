import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [option, setOption] = useState('all');
  const [filterText, setFilterText] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [modalLoading, setModalLoading] = useState(true);
  const [userData, setUserData] = useState<User>();

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
    if (userId != null) {
      setModalLoading(true);
      getUser(userId)
        .then(setUserData)
        .finally(() => setModalLoading(false));
    }
  }, [userId]);

  useEffect(() => {
    let todos = allTodos;

    switch (option) {
      case 'completed':
        todos = todos.filter(todo => todo.completed);
        break;
      case 'active':
        todos = todos.filter(todo => !todo.completed);
        break;
    }

    if (filterText) {
      const lowerCaseFilterText = filterText.toLowerCase();

      todos = todos.filter(todo =>
        todo.title.toLowerCase().includes(lowerCaseFilterText),
      );
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
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          userData={userData}
          loading={modalLoading}
          setShowModal={setShowModal}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
