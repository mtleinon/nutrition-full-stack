import React, { useState, useEffect } from 'react';
import Meals from '../meals/Meals';
import NutrientRow from '../../components/NutrientRow';
import DeleteIcon from '../../components/DeleteIcon';
import OpenIcon from '../../components/OpenIcon';
import CancelIcon from '../../components/CancelIcon';
import CloseIcon from '../../components/CloseIcon';
import Card from '../../components/Card';
import './plan.css';
import Container from '../../components/Container';
import EditableValue from '../../components/EditableValue';
import CenterVertically from '../../components/CenterVertically';
import HeaderRow from '../../components/HeaderRow';
import Modal from '../../components/Modal';
import InfoIcon from '../../components/InfoIcon';

const TEST_DATA = {
  calorie: 230,
  fet: 45,
  protein: 32,
  carb: 87
}


export default React.memo(function Plan(props) {
  // const [editMode, setEditMode] = useState(false);
  const [showMeals, setShowMeals] = useState(false);
  const [showPlanInfo, setShowPlanInfo] = useState(false);

  const editPlanHandler = (name) => {
    // setEditMode(false);
    props.editPlanHandler(props.plan.planId, name);
  };

  // const cancelHandler = () => {
  //   // setEditMode(false);
  // };
  const toggleShowMeals = () => {
    setShowMeals(state => !state);
  };
  const plan = props.plan;
  return (
    <div className="plan">
      <Card active={showMeals}>
        <HeaderRow>
          <EditableValue
            okHandler={editPlanHandler}
            value={plan.name}
          />
          <CenterVertically>
            <InfoIcon onClick={() => setShowPlanInfo(true)} />
            <DeleteIcon onClick={() => props.removeHandler(plan.planId)} />
            {showMeals ? <CloseIcon onClick={() => toggleShowMeals()} /> :
              <OpenIcon onClick={() => toggleShowMeals()} />}
          </CenterVertically>
        </HeaderRow>
        <NutrientRow {...TEST_DATA} sideMargins={'15px'} />
      </Card>
      {
        showMeals &&
        <Container>
          <Meals planId={props.plan.planId} />
        </Container>
      }
      <Modal visible={showPlanInfo} dismiss={() => setShowPlanInfo(false)}>
        <div style={{ height: '80%', width: '100%', backgroundColor: 'lightgray' }}
          // planId={plan.planId}
          // name={plan.name}
          cancelHandler={() => setShowPlanInfo(false)} >
          <HeaderRow>
            <CenterVertically>
              {plan.planId} - {plan.name}
            </CenterVertically>
            <CancelIcon onClick={() => setShowPlanInfo(false)} />

          </HeaderRow>

        </div>
      </Modal>

    </div >
  );
});