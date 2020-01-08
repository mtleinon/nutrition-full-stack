import React, { useState } from 'react';
import './data.css';
import CenterVertically from '../../components/CenterVertically';
import HeaderRow from '../../components/HeaderRow';
import Modal from '../../components/Modal';
import InfoIcon from '../../components/InfoIcon';
import CancelIcon from '../../components/CancelIcon';
import Info from './Info';

export default function Data({ data, selectDataHandler }) {
  const [showNutrientInfo, setShowNutrientInfo] = useState(false);

  return (
    <div className="data">
      <HeaderRow>
        <div style={{ cursor: 'pointer' }}
          onClick={() => selectDataHandler(data.finelliId, data.name)}
        >
          {data.finelliId}. {data.name}
        </div>
        <div style={{ width: '40px', flexBasis: 0 }}>
          <InfoIcon onClick={() => setShowNutrientInfo(true)} />
        </div>
      </HeaderRow>

      <Modal
        visible={showNutrientInfo}
        dismiss={() => setShowNutrientInfo(false)}
      >
        {/* cancelHandler={() => setShowNutrientInfo(false)} > */}
        <HeaderRow>
          Micronutrient data
            <CancelIcon onClick={() => setShowNutrientInfo(false)} />
        </HeaderRow>
        <Info data={data} />
      </Modal>

    </div>
  );
}