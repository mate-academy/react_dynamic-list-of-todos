import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { SortType } from './types/SortType';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filteredBySelect, setFilteredBySelect] = useState(SortType.all);
  const [filteredByQuery, setFilteredByQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showTodoModal, setShowTodoModal] = useState<boolean>(false);

  const loadFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setVisibleTodos(todosFromServer);
  };

  useEffect(() => {
    loadFromServer();
  }, []);

  const filteredTodos = () => {
    const todosFilteredByQuery = todos.filter(
      todo => todo.title.includes(filteredByQuery.toLowerCase().trim()),
    );

    switch (filteredBySelect) {
      case SortType.all:
        setVisibleTodos(todosFilteredByQuery);
        break;

      case SortType.active:
        setVisibleTodos(todosFilteredByQuery.filter(todo => !todo.completed));
        break;

      case SortType.completed:
        setVisibleTodos(todosFilteredByQuery.filter(todo => todo.completed));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    filteredTodos();
  }, [filteredBySelect, filteredByQuery]);

  const handleFilteredData = (select: string) => {
    switch (select) {
      case 'all':
        setFilteredBySelect(SortType.all);
        break;

      case 'active':
        setFilteredBySelect(SortType.active);
        break;

      case 'completed':
        setFilteredBySelect(SortType.completed);
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
                visibleTodos={visibleTodos}
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
