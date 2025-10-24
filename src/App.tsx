/* eslint-disable max-len */
import React, { useEffect, useState } from "react";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import { TodoModal } from "./components/TodoModal";
import { Todo } from "./types/Todo";
import { getTodos, getUser } from "./api";
import { User } from "./types/User";
import { Loader } from "./components/Loader";

export type Category = "all" | "active" | "completed";

export const App: React.FC = () => {
  type FilterOptions = {
    filterCategory: Category;
    filterQuery: string;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [loaderUser, setLoaderUser] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState<string>("");

  const handleSelectTodo = async (todoId: number | null) => {
    if (!todoId) {
      setSelectedTodo(null);
      setUser(null);

      return;
    }

    const todo = todos.find((t) => t.id === todoId);

    if (!todo) {
      return;
    }

    setSelectedTodo(todo);
    setLoaderUser(true);
    setUser(null);

    try {
      const userData = await getUser(todo.userId);

      setUser(userData);
    } catch (error) {
      // Error loading user
    } finally {
      setLoaderUser(false);
    }
  };

  const filterTodo = (
    todosToFilter: Todo[],
    { filterCategory, filterQuery }: FilterOptions,
  ): Todo[] => {
    const searchQuery = filterQuery.toLowerCase().trim();

    return todosToFilter.filter((todo) => {
      const result =
        filterCategory === "all" ||
        (filterCategory === "completed" && todo.completed) ||
        (filterCategory === "active" && !todo.completed);

      const results =
        !searchQuery || todo.title.toLowerCase().includes(searchQuery);

      return result && results;
    });
  };

  const visibleTodos = filterTodo(todos, {
    filterCategory: category,
    filterQuery: query,
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .catch((error) => {
          throw new Error(`Error loading todos: ${error}`);
        })
        .finally(() => setLoading(false));
    }, 500);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                category={category}
                query={query}
                onCategoryChange={setCategory}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>

            {selectedTodo && (
              <TodoModal
                loaderUser={loaderUser}
                selectedTodo={selectedTodo}
                user={user}
                onModalClose={setSelectedTodo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
