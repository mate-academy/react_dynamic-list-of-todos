import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Option } from './types/Option';

interface FilterOptions {
  select: string;
  query: string;
}

function filterBy(todos: Todo[], { select, query }: FilterOptions): Todo[] {
  let filtered = todos;

  if (select) {
    switch (select) {
      case Option.ACTIVE:
        filtered = filtered.filter(todo => !todo.completed);
        break;

      case Option.COMPLETED:
        filtered = filtered.filter(todo => todo.completed);
        break;

      default:
        return filtered;
    }
  }

  if (query) {
    const normilizeQuery = query.toLowerCase().trim();

    filtered = filtered
      .filter(todo => todo.title.toLowerCase().includes(normilizeQuery));
  }

  return filtered;
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [select, setSelect] = useState('');
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [post, setPost] = useState<Todo | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    getTodos()
      .then(setTodos)
      .catch();
  }, [setTodos, setIsLoading]);

  const filteredTodos = filterBy(todos, { select, query });

  const resetModal = () => {
    setIsVisibleModal(false);
    setPost(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={select}
                query={query}
                setSelect={setSelect}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              <TodoList
                todos={filteredTodos}
                setIsVisibleModal={setIsVisibleModal}
                setUserId={setUserId}
                setPost={setPost}
                selectedPostId={post?.id || 0}
              />
            </div>
          </div>
        </div>
      </div>

      {isVisibleModal && (
        <TodoModal
          userId={userId}
          post={post}
          resetModal={() => resetModal()}
        />
      )}
    </>
  );
};
