import React, { useState } from 'react';
import './data.css';
import HeaderRow from '../../components/HeaderRow';
import Modal from '../../components/Modal';
import InfoIcon from '../../components/InfoIcon';
import NutrientReport from '../nutrientReport/NutrientReport';

export default function Data({ nutrientData, selectDataHandler }) {
  const [showNutrientInfo, setShowNutrientInfo] = useState(false);

  return (
    <div className="data">
      <HeaderRow>
        <div style={{ cursor: 'pointer' }}
          onClick={() => selectDataHandler(nutrientData.finelliId, nutrientData.name)}
        >
          {nutrientData.finelliId}. {nutrientData.name}
        </div>
        <div style={{ width: '40px', flexBasis: 0 }}>
          <InfoIcon onClick={() => setShowNutrientInfo(true)} />
        </div>
      </HeaderRow>

      <Modal
        visible={showNutrientInfo}
        dismiss={() => setShowNutrientInfo(false)}
      >
        <NutrientReport
          reportTitle={nutrientData.name}
          nutrientData={Object.values(nutrientData)}
          hideModal={() => setShowNutrientInfo(false)}
        />
      </Modal>

    </div>
  );
}