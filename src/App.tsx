/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadigTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [select, setSelect] = useState('all');
  const [input, setInput] = useState('');

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoadigTodos(true);
      const data = await getTodos();

      setTodos(data);
    } finally {
      setIsLoadigTodos(false);
    }
  };

  useEffect(
    () => {
      loadTodos();
    },
    [],
  );

  const handleSelectedTodos = useMemo(() => {
    let visibleTodos: Todo[] = [...todos];

    switch (select) {
      case 'active':
        visibleTodos = visibleTodos.filter(todo => todo.completed === false);
        break;

      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed === true);
        break;

      case 'all':
      default:
        break;
    }

    visibleTodos = visibleTodos.filter(({ title }) => title.toLowerCase().includes(input.toLowerCase()));

    return visibleTodos;
  }, [select, todos, input]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={setSelect} onInput={setInput} />
            </div>

            <div className="block">
              {isLoadingTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={handleSelectedTodos}
                    onSelectTodo={handleSelectingTodo}
                    selectedTodoId={selectedTodo?.id}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          resetTodo={() => setSelectedTodo(null)}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
