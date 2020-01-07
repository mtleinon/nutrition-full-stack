import React, { useState } from 'react';
import Meals from '../meals/Meals';
import NutrientRow from '../../components/NutrientRow';
import DeleteIcon from '../../components/DeleteIcon';
import OpenIcon from '../../components/OpenIcon';
import CloseIcon from '../../components/CloseIcon';
import Card from '../../components/Card';
import './plan.css';
import Container from '../../components/Container';
import EditableValue from '../../components/EditableValue';

const TEST_DATA = {
  calorie: 230,
  fet: 45,
  protein: 32,
  carb: 87
}


export default React.memo(function Plan(props) {
  // const [editMode, setEditMode] = useState(false);
  const [showMeals, setShowMeals] = useState(false);

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
      <Card>
        <div className="headerRow">
          <EditableValue
            okHandler={editPlanHandler}
            value={plan.name}
          />
          <div className="icons" >
            <DeleteIcon onClick={() => props.removeHandler(plan.planId)} />
            {showMeals ? <CloseIcon onClick={() => toggleShowMeals()} /> :
              <OpenIcon onClick={() => toggleShowMeals()} />}
          </div>
        </div>
        <NutrientRow {...TEST_DATA} />
      </Card>
      {showMeals &&
        <Container >
          <Meals planId={props.plan.planId} />
        </Container>
      }
    </div >
  );
});