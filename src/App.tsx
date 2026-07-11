/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  useEffect(() => {
    // Перед початком запиту обов'язково вмикаємо індикатор завантаження
    setIsLoading(true);

    // Викликаємо функцію запиту (прибираємо крапку з комою в кінці цього рядка, щоб продовжити ланцюжок .then)
    getTodos()
      .then(data => {
        // У разі успішного отримання даних, записуємо їх у наш стейт todos
        setTodos(data);
      })
      .catch((error: unknown) => {
        // Якщо під час запиту виникла помилка, виводимо її в консоль для відлагодження
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      })
      .finally(() => {
        // Цей блок виконається в будь-якому випадку (і при успіху, і при помилці), тому вимикаємо лоадер саме тут.
        setIsLoading(false);
      });
  }, []);
  // Ця змінна перераховується при кожному рендері компонента
  // Оновлена фільтрація, що враховує і статус, і пошуковий текст
  const filteredTodos = todos.filter(todo => {
    // 1. Перевірка статусу виконання
    if (filter === 'active' && todo.completed) {
      return false; // Пропускаємо виконані, якщо статус "active"
    }

    if (filter === 'completed' && !todo.completed) {
      return false; // Пропускаємо невиконані, якщо статус "completed"
    }

    // Перевірка пошукового тексту (регістронезалежна)
    // Перетворюємо і назву, і пошуковий запит у нижній регістр за допомогою .toLowerCase()
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Завдання потрапить у фінальний масив, тільки якщо пройшло обидва етапи
    return matchesSearch;
  });

  const handleSelectTodo = async (todo: Todo) => {
    setIsModalLoading(true);
    setSelectedTodo(todo);

    try {
      const userData = await getUser(todo.userId); // Використання хелпера

      setSelectedUser(userData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Помилка:', error);
    } finally {
      setIsModalLoading(false);
    }
  };

  // Функція для повного закриття модалки та очищення даних
  const handleCloseModal = () => {
    setSelectedTodo(null); // Скидаємо вибране завдання
    setSelectedUser(null); // Скидаємо завантаженого користувача
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="block">
              {isLoading ? (
                // Якщо завантаження триває, показуємо лоадер
                <Loader data-cy="loader" />
              ) : (
                // Якщо завантаження завершено, показуємо наш список справ
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  // Передаємо функцію, яка вміє і лоадер вмикати, і робити запит до API
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleCloseModal}
          isModalLoading={isModalLoading}
          selectedUser={selectedUser}
        />
      )}
    </>
  );
};
