import React from 'react';
import './Filters.css'

function Filters(props) {
  const handleChanges = event => {
    props.onFiltersChange(event.target.name, event.target.value);
  };
  const { names } = props;
  const { title, showingWithStatus, name } = props.filters;

  return (
    <section className="filters">
      <label htmlFor="title" className="label-wrapper">
        <div>
          Search in title:&#8195;
          <span className="arrow">&#10097;</span>
        </div>
        <input
          className="inputs"
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={handleChanges}
        />
      </label>

      <label htmlFor="showingStatus" className="label-wrapper">
        <div>
          Showed status: {showingWithStatus}&#8195;
          <span className="arrow">&#10097;</span>
        </div>
        <select
          className="inputs"
          id="showingStatus"
          name="showingWithStatus"
          contentEditable={false}
          value={showingWithStatus}
          onChange={handleChanges}
        >
          <option key="All" value="All">All</option>
          <option key="In process" value="In process">In process</option>
          <option key="Done" value="Done">Done</option>
        </select>
      </label>

      <label htmlFor="name" className="label-wrapper">
        <div>
          Show only user:&#8195;
          <span className="arrow">&#10097;</span>
        </div>
        <select
          className="inputs"
          id="name"
          value={name}
          name="name"
          contentEditable={false}
          onChange={handleChanges}
        >
          {names.map(name => (<option key={name}>{name}</option>))}
        </select>
      </label>
    </section>
  );
}

export default Filters;
