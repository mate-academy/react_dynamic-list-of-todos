/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { useEffect } from 'react';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const clearQuery = () => setQuery('');

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => 
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
  
  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);


   return (
     <>
       <div className="section">
         <div className="container">
           <div className="box">
             <h1 className="title">Todos:</h1>

             <div className="block">
               <TodoFilter
                 filter={filter}
                 onFilterChange={setFilter}
                 query={query}
                 onQueryChange={setQuery}
                 onClearQuery={clearQuery}
               />
             </div>

             <div className="block">
               {isLoading ? (
                 <Loader />
               ) : (
                 <TodoList todos={filteredTodos} onSelect={handleSelectTodo} />
               )}
             </div>
           </div>
         </div>
       </div>

       {selectedTodo && (
         <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
       )}
     </>
   );
};
