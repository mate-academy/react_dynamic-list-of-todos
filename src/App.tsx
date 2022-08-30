import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

const getFilteredTodos = (
  todos: Todo[], filteredBySelect: string, filteredByQuery: string,
) => {
  const todosFiltered = todos.filter(
    todo => todo.title.includes(filteredByQuery.toLowerCase().trim()),
  );

  switch (filteredBySelect) {
    case 'active':
      return todosFiltered.filter(todo => !todo.completed);

    case 'completed':
      return todosFiltered.filter(todo => todo.completed);

    case 'all':
    default:
      return todosFiltered;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBySelect, setFilteredBySelect] = useState('all');
  const [filteredByQuery, setFilteredByQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showTodoModal, setShowTodoModal] = useState(false);

  const loadFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    loadFromServer();
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, filteredBySelect, filteredByQuery);
  }, [todos, filteredBySelect, filteredByQuery]);

  const handleFilteredData = (select: string) => {
    switch (select) {
      case 'all':
        setFilteredBySelect(select);
        break;

      case 'active':
        setFilteredBySelect(select);
        break;

      case 'completed':
        setFilteredBySelect(select);
        break;

      default:
        break;
    }
  };

  const handleFoundData = (query: string) => {
    setFilteredByQuery(query);
  };

  const handleFoundTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
    setShowTodoModal(true);
  };

  const handleCloseModal = () => {
    setShowTodoModal(false);
    setSelectedTodo(null);
  };

  const handleClearedQuery = () => (
    filteredByQuery && setFilteredByQuery('')
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredByQuery={filteredByQuery}
                handleFoundData={handleFoundData}
                handleFilteredData={handleFilteredData}
                handleClearedQuery={handleClearedQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                filteredTodos={filteredTodos}
                selectedTodo={selectedTodo}
                handleFoundTodo={handleFoundTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {showTodoModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}

        />
      )}
    </>
  );
};
