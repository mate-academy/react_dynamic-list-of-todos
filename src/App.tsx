import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { filterTodosByRule, findTodosByQuery } from './services/service';

import { FilterRules } from './types/FilterField';
import { Todo } from './types/Todo';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [rule, setRule] = useState<FilterRules>(FilterRules.ALL);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const findTodos = findTodosByQuery(todos, query);

    const filterByRule = filterTodosByRule(findTodos, rule);

    return filterByRule;
  }, [todos, query, rule]);

  const handleClick = useCallback((todo: Todo) => {
    setSelectedUserId(todo.userId);
    setSelectedTodo(todo);
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
                rule={rule}
                setQuery={setQuery}
                chooseRule={setRule}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList todos={filteredTodos} handleClick={handleClick} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          currentTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          selectedUserId={selectedUserId}
        />
      )}
    </>
  );
};
