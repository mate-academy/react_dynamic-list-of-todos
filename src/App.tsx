/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
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
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectFilterType, setSelectFilterType] = useState('all');

  const visibleTodos = todos.filter(todo => {
    const preparedQuery = query.toLowerCase().trim();
    const preparedTitle = todo.title.toLowerCase();
    const filteredTodos = preparedTitle.includes(preparedQuery);

    switch (selectFilterType) {
      case 'all':
        return filteredTodos;

      case 'active':
        return filteredTodos && !todo.completed;

      case 'completed':
        return filteredTodos && todo.completed;

      default:
        return true;
    }
  });

  const selectedTodo = todos.find(todo => todo.id === todoId);

  const onCloseModal = useCallback(
    () => {
      setTodoId(0);
    },
    [],
  );

  useEffect(() => {
    getTodos()
      .then(todo => setTodos(todo));
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
                selectFilterType={selectFilterType}
                onChangeFilter={setSelectFilterType}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={todoId}
                  selectTodo={(id: number) => {
                    setTodoId(id);
                  }}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={onCloseModal} />
      )}
    </>
  );
};
