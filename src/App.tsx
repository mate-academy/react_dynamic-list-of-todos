/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const resetTodo = () => {
    setTodo(null);
  };
  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/todos.json');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);
  function checkFilters(elements: Todo[]) {
    let filtered = [...elements];
    if (filter === 'active') {
      filtered = filtered.filter(el => el.completed === false);
    } else if (filter === 'completed') {
      filtered = filtered.filter(el => el.completed === true);
    }
    if (query) {
      filtered = filtered.filter(el =>
        el.title.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return filtered;
  }
  function handleButton(todo: Todo) {
    setTodo(todo);
    setModal(true);
  }
  const visibleTodos = checkFilters(todos);
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                onInput={setQuery}
                onOption={setFilter}
                query={query}
              />
            </div>
            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onButton={handleButton}
                selectedTodo={todo}
              />
            </div>
          </div>
        </div>
      </div>
      {modal && todo && <TodoModal todo={todo} onClose={resetTodo} />}
    </>
  );
};
