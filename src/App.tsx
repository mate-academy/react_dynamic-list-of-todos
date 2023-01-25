/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [selectedOption, setSelectedOption] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = useMemo(
    () => todos.filter(todo => {
      const filteredTodo = todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase());

      switch (selectedOption) {
        case 'completed':
          return filteredTodo && todo.completed;
        case 'active':
          return filteredTodo && !todo.completed;
        case 'all':
          return filteredTodo;
        default:
          return true;
      }
    }), [todos, selectedOption, searchQuery],
  );

  const selectedTodo = useMemo(
    () => todos.find(todo => todo.id === todoId), [todoId, todos],
  );

  const handleSelectTodo = useCallback((id: number) => setTodoId(id), []);

  useEffect(() => {
    getTodos().then(setTodos);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                searchQuery={searchQuery}
                onChangeSelect={setSelectedOption}
                onChangeSearch={setSearchQuery}
              />
            </div>

            <div className="block">
              {
                todos.length === 0
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodoId={todoId}
                      selectTodo={handleSelectTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setTodoId={setTodoId} />
      )}
    </>
  );
};
