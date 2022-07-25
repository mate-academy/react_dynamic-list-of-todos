import { Loader } from '../Loader';

export const TodoModal = () => {
  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <Loader />

      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title has-text-weight-medium">
            Todo&nbsp;#118
          </div>
          <a href="#close" className="delete">Close</a>
        </header>

        <div className="modal-card-body">
          <p className="block">corporis ducimus ea perspiciatis iste</p>

          <p className="block">
            <strong className="has-text-success">Done</strong>
            <strong className="has-text-danger">Planned</strong>
            {' by '}
            <a href="mailto:Sincere@april.biz">
              Leanne Graham
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
