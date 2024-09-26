/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loader, setloader] = useState(false);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setFilteredTodos(todosFromServer);
    });
  }, []);

  const filterTodos = (statusTodo: string, searchTermTodo: string) => {
    let updatedTodos = todos;

    if (statusTodo === 'active') {
      updatedTodos = updatedTodos.filter(todo => !todo.completed);
    } else if (statusTodo === 'completed') {
      updatedTodos = updatedTodos.filter(todo => todo.completed);
    }

    if (searchTermTodo) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchTermTodo.toLowerCase()),
      );
    }

    setFilteredTodos(updatedTodos);
  };

  const handleFilterChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
    filterTodos(selectedStatus, searchTerm);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    filterTodos(status, term);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
