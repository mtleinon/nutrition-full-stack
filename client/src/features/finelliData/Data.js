import React from 'react';
import './data.css';

export default function Data({ data, selectDataHandler }) {

  return (
    <div className="data"
      onClick={() => selectDataHandler(data.finelliId, data.name)}>
      {data.finelliId}. {data.name}
    </div>
  );
}