import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Selection } from './types/Selection';

import { getTodos } from './api/todos';

import { getFilteredTodos } from './helpers/getFilteredTodos';
import { getTodoById } from './helpers/getTodoById';
import { debounce } from './helpers/debounce';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [selectedType, setSelectedType] = useState(Selection.all);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(error => new Error('Error fetching todos:', error));
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, selectedType, appliedQuery),
    [todos, selectedType, appliedQuery],
  );

  const selectedTodo = getTodoById(selectedTodoId, todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                query={query}
                setQuery={setQuery}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
