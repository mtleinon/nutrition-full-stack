import React from 'react';
import { useSelector } from 'react-redux';

// import VirtualList from 'react-tiny-virtual-list';
// import { FixedSizeList as List } from 'react-window';
import Data from './Data';
import './finelliData.css';


export default React.memo(function FinelliData({ selectDataHandler }) {
  const finelliData = useSelector(state => state.finelliData.finelliData);
  const error = useSelector(state => state.nutrients.error);
  // const style = { border: 'solid 1px red' };

  // const Row = ({ index, style }) => (
  //   <div style={style}>
  //     <div>
  //       {finelliData[index].finelliId}- {finelliData[index].name}
  //     </div>
  //     <button onClick={selectDataHandler(finelliData[index].finelliId)} >SELECT</button>
  //   </div>
  // );

  return (
    <div className="finelliData">
      {/* <h4>Finelli Data</h4> */}
      {/* <List
        height={150}
        itemCount={finelliData.length}
        itemSize={50}
        width={300}
      >
        {Row}
      </List> */}


      {/* <VirtualList
        width='100%'
        height='100%'
        itemCount={finelliData.length}
        itemSize={50} // Also supports variable heights (array or function getter)
        renderItem={({ index, style }) =>
          <div key={index} style={{ boxSizing: 'border-box', border: '1px solid red', ...style }}

          >
            <div>
              {finelliData[index].finelliId}. {finelliData[index].name}
            </div>
            <button onClick={selectDataHandler(finelliData[index].finelliId)} >SELECT</button>
          </div>
        }

      /> */}
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