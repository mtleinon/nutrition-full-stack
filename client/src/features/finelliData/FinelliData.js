import React from 'react';
import { useSelector } from 'react-redux';

import Data from './Data';
import './finelliData.css';

export default React.memo(function FinelliData({ selectDataHandler }) {
  const finelliData = useSelector(state => state.finelliData.finelliData);
  const error = useSelector(state => state.nutrients.error);

  return (
    <div className="finelliData">

      {finelliData.map(data => <Data
        key={data.finelliId}
        data={data}
        selectDataHandler={selectDataHandler}
      />)
      }
      <div>Error: {error}</div>
    </div>
  );
});