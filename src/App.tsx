/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './components/Enums/FilterBy';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(FilterBy.ALL);
  const [filterText, setFilterText] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleFilterChange = (status: FilterBy) => {
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
    getTodos()
      .then((todosData: Todo[]) => {
        setTodos(todosData);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    return (
      (selectedStatus === FilterBy.ALL || (selectedStatus === FilterBy.ACTIVE && !todo.completed)
        || (selectedStatus === FilterBy.COMPLETED && todo.completed))
      && (filterText === '' || todo.title.toLowerCase()
        .includes(filterText.toLowerCase().trim()))
    );
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={selectedStatus}
                onFilterChange={handleFilterChange}
                onTextChange={handleTextChange}
                filterText={filterText}
              />
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
