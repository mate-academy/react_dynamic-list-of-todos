import React from 'react';

function SortingButtons({ sorting }) {
  return (
    <div className="btn-group col-sm-8 px-0 mx-auto" role="group" aria-label="Basic example">
      <button
        type="button"
        className="btn btn-secondary" 
        onClick={() => sorting('Sort by title')}
      >
        Sort by title
      </button>
      <button 
        type="button"
        className="btn btn-secondary" 
        onClick={() => sorting('Sort by username')}
      >
        Sort by username
      </button>
      <button 
        type="button"
        className="btn btn-secondary" 
        onClick={() => sorting('Sort by status')}
      >
        Sort by status
      </button>
      <button 
        type="button"
        className="btn btn-secondary" 
        onClick={() => sorting('Show default list')}
      >
        Show default list
      </button>
    </div>
  );
}

export default SortingButtons;
