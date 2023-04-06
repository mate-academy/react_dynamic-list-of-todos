type Props = {
  onTodoSelected: (id: number | null) => void,
};

export const TodoModalError: React.FC<Props> = ({ onTodoSelected }) => (
  <div className="modal-card">
    <header
      className="modal-card-head"
      style={{ backgroundColor: '#ff6666' }}
    >
      <div
        className="modal-card-title has-text-weight-medium"
      >
        ERROR
      </div>

      <button
        aria-label="modal-close-button"
        type="button"
        className="delete"
        onClick={() => onTodoSelected(null)}
      />
    </header>

    <div className="modal-card-body">
      <h3>Error occured when data loaded</h3>
    </div>
  </div>
);
