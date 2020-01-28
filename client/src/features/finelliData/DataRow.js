import React, { useState } from 'react';
import './data.css';
import Modal from '../../components/Modal';
import InfoIcon from '../../components/InfoIcon';
import NutrientReport from '../nutrientReport/NutrientReport';
import { I_NAME, I_FINELLI_ID } from '../finelliData/constants'

export default function DataRow({ nutrientData, selectDataHandler }) {
  const [showNutrientInfo, setShowNutrientInfo] = useState(false);

  return (
    <div className="data">
      <div style={{ display: 'flex' }} >
        <div style={{ cursor: 'pointer', flex: 1, wordBreak: 'break-all' }}
          onClick={() => selectDataHandler(nutrientData[I_FINELLI_ID], nutrientData[I_NAME])}
        >
          {nutrientData[I_FINELLI_ID]}. {nutrientData[I_NAME]}
        </div>
        <div style={{ width: '40px', flexBasis: 0 }}>
          <InfoIcon onClick={() => setShowNutrientInfo(true)} />
        </div>
      </div>

      <Modal
        visible={showNutrientInfo}
        dismiss={() => setShowNutrientInfo(false)}
      >
        <NutrientReport
          reportTitle={nutrientData[I_NAME]}
          nutrientData={nutrientData}
          hideModal={() => setShowNutrientInfo(false)}
        />
      </Modal>

    </div>
  );
}