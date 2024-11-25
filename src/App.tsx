/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any | null>(null);

  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'completed'
        ? todo.completed
        : filter === 'active'
        ? !todo.completed
        : true;

    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });


  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (error) {
        console.error('Failed to load todos', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleSelectTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    try {
      const userData = await getUser(todo.userId);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={setFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} onSelect={handleSelectTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} user={user} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
