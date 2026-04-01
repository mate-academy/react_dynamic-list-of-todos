/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';



export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // array of all todo from api
  const [loading, setLoading] = useState(false); // loading data
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null); // selected todo for modal
  const [filter, setFilter] = useState('all'); // filter statuses : 'all', 'active', 'completed'
  const [query, setQuery] = useState(''); // query for search
  
  // useEffect
  useEffect(() => {
    setLoading(true);
  
    getTodos()
      .then(setTodos) // when data is loaded, set it to the state
      .finally(() => setLoading(false)); // delete loading in anyone case
  }, []) // = use only one time when component is loaded
  
  const visibleTodos = todos
    .filter(todo => {
      switch (filter) {
        case 'active': return !todo.completed;
        case 'completed': return todo.completed;
        default: return true; // 'all'
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <div className='block'>
        {loading ? (
          <Loader />
        ) : (
          <TodoList
            todos={visibleTodos}
            selectedTodo={selectedTodo}
            onSelectTodo={setSelectedTodo}
          />
        )}
      </div>

      <TodoFilter
        filter={filter}
        onFilterChange={setFilter}
        query={query}
        onQueryChange={setQuery}
      />

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
