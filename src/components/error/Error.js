import './error.css';
import React from 'react';

function Error({load}) {
  console.log(1)
  return (
    <>
    <div className="lds-hourglass"></div>;
    <button
      className="btn btn-dark mx-auto mt-5 btn-block w-25"
      onClick={load}>
      Try again
    </button>
    </>
  );
}

export default Error;
