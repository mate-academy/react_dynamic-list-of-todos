import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getUser, getTodos } from './api';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { useEffect, useState } from 'react';

export const App: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('all');

  useEffect(() => {
    getTodos().then(todosFromServer => {
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
  }, [query, filterBy]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModel() {
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
        <TodoModal user={user} todo={selectTodo} onClose={closeModel} />
      )}
    </>
  );
};
