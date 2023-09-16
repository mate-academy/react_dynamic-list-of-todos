/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filterText, setFilterText] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleFilterChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleTextChange = (text: string) => {
    setFilterText(text);
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos().then((todosData: Todo[]) => {
      setTodos(todosData);
      setLoading(false);
    });
  }, []);

  const filteredTodos = todos.filter(todo => {
    return (
      (selectedStatus === 'all' || (selectedStatus === 'active' && !todo.completed)
        || (selectedStatus === 'completed' && todo.completed))
      && (filterText === '' || todo.title.toLowerCase()
        .includes(filterText.toLowerCase()))
    );
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilterChange={handleFilterChange} onTextChange={handleTextChange} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && <TodoList todos={filteredTodos} todoSelect={handleTodoClick} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (<TodoModal selectedTodo={selectedTodo} closeModal={handleModalClose} />)}
    </>
  );
};
