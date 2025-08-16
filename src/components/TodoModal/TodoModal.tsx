import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

export const TodoModal: React.FC<{
  todo: Todo;
  user: User | null;
  onClose: () => void;
}> = ({ todo, user, onClose }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Todo Details</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>Status:</strong> {todo.completed ? 'Completed' : 'Active'}
          </p>
          {user && (
            <>
              <p>
                <strong>User:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </>
          )}
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
