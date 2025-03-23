import { Loader } from '../Loader';
export const TodoModal: React.FC = ({
  modal,
  setModal,
  loading,
  selectUser,
  selectedTodo,
  setSelectedTodo,
}) => {
  if (!modal || !selectedTodo) {
    return null;
  }

  const closeModal = () => {
    setModal(false);
    setSelectedTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${selectUser.email}`}>{selectUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
