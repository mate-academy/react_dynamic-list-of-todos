import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import { useCallback, useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('all');

  const fetchTodos = useCallback(() => {
    return getTodos();
  }, []);

  useEffect(() => {
    fetchTodos().then(todosFromServer => {
      let filteredTodos = [...todosFromServer];

      if (query) {
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      if (filterBy === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
      } else if (filterBy === 'active') {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
      }

      setTodos(filteredTodos);
    });
  }, [query, filterBy, fetchTodos]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setUser(null);
    setSelectTodo(null);
  }

  function getUserById(id: number) {
    if (id) {
      getUser(id).then(setUser);
    } else {
      setUser(null);
    }
  }

  function getTodoId(todo: Todo) {
    if (todo) {
      setSelectTodo(todo);
    } else {
      setSelectTodo(null);
    }
  }

  function getQuery(text: string) {
    if (text) {
      setQuery(text);
    } else {
      setQuery('');
    }
  }

  function getFilter(text: string) {
    if (text) {
      setFilterBy(text);
    } else {
      setFilterBy('');
    }
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                getQuery={getQuery}
                getFilter={getFilter}
              />
            </div>

            <div className="block">
              {todos ? (
                <TodoList
                  todos={todos}
                  selectedTodo={selectTodo}
                  openModal={openModal}
                  getUserId={getUserById}
                  getTodoId={getTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <TodoModal user={user} todo={selectTodo} onClose={closeModal} />
      )}
    </>
  );
};
