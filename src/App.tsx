import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>('all');

  const handleFilter
  = (todosArray: Todo[], text: string, option: string): Todo[] => {
    return todosArray.filter((todo) => {
      const lowerCaseTitle = todo.title.toLowerCase().trim();

      if (option === 'all') {
        return lowerCaseTitle.includes(text.toLowerCase().trim());
      }

      if (option === 'active') {
        return !todo.completed
        && lowerCaseTitle.includes(text.toLowerCase().trim());
      }

      if (option === 'completed') {
        return todo.completed
        && lowerCaseTitle.includes(text.toLowerCase().trim());
      }

      return false;
    });
  };

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setisLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterByOption={filterOption}
                setFilterByOption={setFilterOption}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={handleFilter(todos, query, filterOption)}
                    setShowModal={setShowModal}
                    setSelectedTodo={setSelectedTodo}
                    setUserId={setUserId}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          userId={userId as number}
          todo={selectedTodo}
          setShowModal={setShowModal}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
