import React, { useState } from 'react';
import Nutrients from '../nutrients/Nutrients';
import Card from '../../components/Card';
import Container from '../../components/Container';
import NutrientRow from '../../components/NutrientRow';
import DeleteIcon from '../../components/DeleteIcon';
import OpenIcon from '../../components/OpenIcon';
import CloseIcon from '../../components/CloseIcon';
import InfoIcon from '../../components/InfoIcon';
import EditableValue from '../../components/EditableValue';
import CenterVertically from '../../components/CenterVertically';
import Modal from '../../components/Modal';

import './meal.css';
import HeaderRow from '../../components/HeaderRow';
import MealNutrientReport from './MealNutrientReport';

const TEST_DATA = {
  calorie: 230,
  fet: 45,
  protein: 32,
  carb: 87
}

export default React.memo(function Meal(props) {
  const [showNutrients, setShowNutrients] = useState(false);
  const meal = props.meal;
  const [showMealInfo, setShowMealInfo] = useState(false);

  console.debug('Meals: showMealInfo  =', showMealInfo);
  const editMealHandler = (name) => {
    props.editMealHandler(meal.mealId, name);
  };
  const toggleShowNutrients = () => {
    setShowNutrients(state => !state);
  };
  return (
    <div className="meal">
      <Card active={showNutrients}>
        <HeaderRow>
          <EditableValue
            okHandler={editMealHandler}
            value={meal.name}
          />
          <CenterVertically>
            <InfoIcon onClick={() => setShowMealInfo(true)} />

            <DeleteIcon onClick={() => props.removeHandler(meal.mealId)} />
            {showNutrients ? <CloseIcon onClick={() => toggleShowNutrients()} /> :
              <OpenIcon onClick={() => toggleShowNutrients()} />}
          </CenterVertically>
        </HeaderRow>
        <NutrientRow {...TEST_DATA} sideMargins={'10px'} />
      </Card>
      {showNutrients &&
        <Container >
          <Nutrients mealId={meal.mealId} />
        </Container>
      }
      <Modal
        visible={showMealInfo}
        dismiss={() => setShowMealInfo(false)}
      >
        <MealNutrientReport
          mealId={meal.mealId}
          mealName={meal.name}
          hideModal={() => setShowMealInfo(false)}
        />
      </Modal>
    </div>
  );
});