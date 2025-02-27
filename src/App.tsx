/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const defaultTodo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
  user: { id: 0, name: '', email: '', phone: '' },
};

export const App = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(defaultTodo);

  useEffect(() => {
    const getTodosWithUsers = async () => {
      try {
        setLoading(true);
        const todos = await getTodos();

        const todosWithUsers = await Promise.all(
          todos.map(async todo => ({
            ...todo,
            user: await getUser(todo.userId),
          })),
        );

        setAllTodos(todosWithUsers);
      } catch (error) {
        setErrorMessage('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    getTodosWithUsers();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearch={setSearch}
                search={search}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {errorMessage}
              <TodoList
                allTodos={allTodos}
                filter={filter}
                search={search}
                setModalActive={setModalActive}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {modalActive && (
        <TodoModal
          setModalActive={setModalActive}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
