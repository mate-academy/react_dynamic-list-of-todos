/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import debounce from 'lodash.debounce';

import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoSelected, setTodoSelected] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [query, setQuery] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState<string>('');
  const [typeOfSelection, setTypeOfSelection] = useState('all');

  useEffect(() => {
    getTodos().then(currentTodos => {
      setTodos(currentTodos);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    switch (typeOfSelection) {
      case 'all':
        setVisibleTodos(todos);
        break;

      case 'active':
        setVisibleTodos(todos
          .filter(todo => todo.completed === false));
        break;

      case 'completed':
        setVisibleTodos(todos.filter(todo => todo.completed === true));
        break;

      default:
        break;
    }

    setVisibleTodos(currentTodos => currentTodos.filter(todo => todo.title.toLowerCase().includes(appliedQuery.toLowerCase())));
  }, [typeOfSelection, appliedQuery, todos]);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const handleInputQuery = (inputQuery: string) => {
    setQuery(inputQuery);
  };

  const handletypeOfSelection = (selectType: string) => {
    setTypeOfSelection(selectType);
  };

  const handleTodoSelect = (selectedTodo: Todo | null) => {
    setTodoSelected(selectedTodo);
  };

  const mixTodos = (todosVisible: Todo[]) => {
    setVisibleTodos([...todosVisible].sort(() => Math.random() - 0.5));
  };

  const reset = () => setQuery('');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {isLoaded === false && (<Loader />)}
              <TodoFilter
                reset={reset}
                query={query}
                applyQuery={applyQuery}
                onHandleInputQuery={handleInputQuery}
                onHandletypeOfSelection={handletypeOfSelection}
              />
            </div>

            <div className="block">
              <TodoList
                todos={visibleTodos}
                todoSelectedId={todoSelected?.id || 0}
                onTodoSelect={handleTodoSelect}
                onMixTodos={mixTodos}
              />
            </div>
          </div>
        </div>
      </div>
      {todoSelected && (
        <TodoModal
          todo={todoSelected}
          onClose={setTodoSelected}
        />
      )}
    </>
  );
};
