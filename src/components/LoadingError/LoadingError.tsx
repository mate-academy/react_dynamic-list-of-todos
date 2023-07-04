import { FC } from 'react';
import cn from 'classnames';

interface Props {
  loading: boolean;
  loadTodos: () => void;
}

export const LoadingError: FC<Props> = ({ loading, loadTodos }) => (
  <div>
    <p className="notification is-danger is-light">
      An error occured when loading todos!
    </p>

    <button
      className={cn('button is-link', {
        'is-loading': loading,
      })}
      type="button"
      onClick={loadTodos}
    >
      Try again
    </button>
  </div>
);
