/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FILTEREDBY } from './types/SortedBy';

type Props = {
  quary: string,
  filterBy: string,
};

function getFilteredTodos(todos: Todo[], { quary, filterBy }: Props): Todo[] {
  let copieTodos = [...todos];

  if (filterBy) {
    switch (filterBy) {
      case FILTEREDBY.All:
        break;
      case FILTEREDBY.Active:
        copieTodos = copieTodos.filter(todo => !todo.completed);
        break;
      case FILTEREDBY.Completed:
        copieTodos = copieTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  if (quary) {
    const normalizedQuary = quary.trim().toLowerCase();

    copieTodos = copieTodos.filter(
      todo => todo.title.toLowerCase().includes(normalizedQuary),
    ) || null;

    return copieTodos;
  }

  return copieTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [quary, setQuary] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const filteredTodos = getFilteredTodos(todos, { quary, filterBy });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuary={setQuary}
                quary={quary}
                setFilterBy={setFilterBy}
                filterBy={filterBy}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}
              <TodoList
                todos={filteredTodos}
                onSelectedTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id ?? 0}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
