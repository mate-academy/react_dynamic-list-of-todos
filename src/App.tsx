import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter, SelectOptions } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { applyFilter } from './utils/todoUtils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(SelectOptions.All);
  const [query, setQuery] = useState('');
  const [targetTodoModal, setTargetTodoModal] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const todosData = await getTodos();

        setTodos(todosData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const filteredTodos = applyFilter(todos, selectedOption, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
                onQueryChange={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onOpen={setTargetTodoModal}
                  targetTodo={targetTodoModal}
                />
              )}
            </div>
          </div>
          {targetTodoModal && (
            <TodoModal
              targetTodo={targetTodoModal}
              onClose={() => setTargetTodoModal(null)}
            />
          )}
        </div>
      </div>
    </>
  );
};
