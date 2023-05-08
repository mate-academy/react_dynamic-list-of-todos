/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadAllTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    loadAllTodos();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onClear = () => {
    setQuery('');
  };

  const getFilteringTodos = ():Todo[] => {
    let visibleTodos = [...todos];

    switch (filterValue) {
      case 'active': visibleTodos = visibleTodos.filter((todo) => !todo.completed);
        break;
      case 'completed': visibleTodos = visibleTodos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    visibleTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    return visibleTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterValue={setFilterValue}
                handleChange={handleChange}
                onClear={onClear}
              />
            </div>

            <div className="block">
              <TodoList todos={getFilteringTodos()} setSelectedTodo={setSelectedTodo} />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
