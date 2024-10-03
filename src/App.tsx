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
  const [statusTodo, setStatusTodo] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setLoader(false));
  }, []);

  const filterTodos = (status: string, searchTermTodo: string) => {
    let updatedTodos = todos;

    switch (status) {
      case 'active':
        updatedTodos = updatedTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        updatedTodos = updatedTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (searchTermTodo) {
      const lowerCaseSearchTerm = searchTermTodo.toLowerCase();

      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(lowerCaseSearchTerm),
      );
    }

    return updatedTodos;
  };

  const handleFilterChange = (selectedStatus: string) => {
    setStatusTodo(selectedStatus);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = filterTodos(statusTodo, searchTerm);

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
                statusTodo={statusTodo}
                searchTerm={searchTerm}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};
