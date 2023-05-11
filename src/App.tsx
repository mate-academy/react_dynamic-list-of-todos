import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, TodoWithUser } from './types/Todo';
import { FILTERS } from './types/FILTERS';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');
  const [todo, setTodo] = useState<TodoWithUser | null>(null);
  const [isTodoModal, setIsTodoModal] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const onQueryChange = (text: string) => {
    setQuery(text);
  };

  const onOptionChange = (text: string) => {
    setOption(text);
  };

  const onChange = (visibleTodo: TodoWithUser | null) => {
    setTodo(visibleTodo);
  };

  const onClose = (isClosing: boolean) => {
    setIsTodoModal(isClosing);
  };

  const visibleTodos = useMemo(() => todos.filter(({ title, completed }) => {
    const lowerTitle = title.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    const result = lowerTitle.includes(lowerQuery);

    switch (option) {
      case FILTERS.active:
        return result && !completed;
      case FILTERS.completed:
        return result && completed;

      default:
        return result;
    }
  }), [todos, option, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={onQueryChange}
                option={option}
                onOptionChange={onOptionChange}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onChange={onChange}
                    isTodoModal={isTodoModal}
                    onClose={onClose}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isTodoModal && (
        <TodoModal
          todo={todo}
          onChange={onChange}
          onClose={onClose}
        />
      )}
    </>
  );
};
