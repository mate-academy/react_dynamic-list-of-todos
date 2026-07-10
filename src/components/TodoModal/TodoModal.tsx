// TodoModal.tsx
import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User'; // Імпортуємо тип User для пропсів

export interface TodoModalProps {
  // Поточне вибране завдання
  selectedTodo: Todo | null;
  // Функція для закриття модалки
  onClose: () => void;
  // Стан завантаження даних користувача
  isModalLoading: boolean;
  // Дані завантаженого користувача
  selectedUser: User | null;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  isModalLoading,
  onClose,
  selectedUser,
}) => {
  return (
    // Клас is-active додається, тільки якщо є вибране завдання
    <div
      className={classNames('modal', { 'is-active': selectedTodo })}
      data-cy="modal"
    >
      {/* Фон модалки, при кліку на який вона закривається */}
      <div className="modal-background" onClick={onClose} />

      {/* Картка модалки має рендеритися ЗАВЖДИ, щоб заголовок і хрестик були видимі */}
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {selectedTodo ? `Todo #${selectedTodo.id}` : 'Todo'}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        {/* Лоадер переносимо СЮДИ — всередину тіла модалки */}
        <div className="modal-card-body">
          {isModalLoading ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              {/* Ось тут додаємо відкриваючий тег p */}
              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': selectedTodo?.completed,
                    'has-text-danger': !selectedTodo?.completed,
                  })}
                >
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${selectedUser?.email}`}>
                  {selectedUser?.name || 'Unknown User'}
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
