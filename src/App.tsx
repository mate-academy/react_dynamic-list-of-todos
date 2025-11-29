/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { is } from 'cypress/types/bluebird';
import { getTodos } from './api';
import { Todo } from './types/Todo';



export const App: React.FC = () => {

const [todos, setTodos] = useState<Todo[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
const [query, setQuery] = useState('');

const visibleTodos = todos.filter(todo => {
  if(filter === 'completed') {
    return todo.completed;
  }
  if(filter === 'active') {
    return !todo.completed;
  }
 return true;
})
.filter(todo =>
  todo.title.toLowerCase().includes(query.toLowerCase())
);


  const loadTodos = () => {
    setIsLoading(true);

    getTodos()
    .then(newTodos => {
      setTodos(newTodos);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
 loadTodos();
  }, [])

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter}
              onFilterChange={setFilter}
              query={query}
              onQueryChange={setQuery}/>
            </div>

            <div className="block">
            {isLoading
                ? <Loader />
                : <TodoList todos={visibleTodos}
                onShow={handleShowTodo} />}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedTodo && (
      <TodoModal todo={selectedTodo}
      onClose={() => setIsModalOpen(false)}/>
      )}
    </>
  );
};
