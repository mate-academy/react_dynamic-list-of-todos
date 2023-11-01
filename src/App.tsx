import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { filterAndSearchTodos } from './Filters/filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error downloading todos');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredTodos(filterAndSearchTodos(todos, filterStatus, searchQuery));
  }, [todos, filterStatus, searchQuery]);

  const onSelectTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);
    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch (e) {
      setError('Error downloading user');
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <>
      {error && (
        <div className="notification is-danger">
          {error}
        </div>
      )}
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                setFilterStatus={setFilterStatus}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>
            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    onSelectTodo={onSelectTodo}
                    selectedTodoId={selectedTodo?.id || null}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        loadingUser ? (
          <Loader />
        ) : (
          selectedUser && (
            <TodoModal
              todo={selectedTodo}
              onClose={() => setSelectedTodo(null)}
              user={selectedUser}
              loadingUser={false}
            />
          )
        )
      )}
    </>
  );
};
