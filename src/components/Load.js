import React from 'react';

function Load({ showList }) {
  return (
    <button onClick={showList} type="submit" className="ui blue button">
      Load
    </button>
  );
}

export default Load;
