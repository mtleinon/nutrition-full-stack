import React, { useState } from 'react';
import Nutrients from '../nutrients/Nutrients';
import Card from '../../components/Card';
import Container from '../../components/Container';
import NutrientRow from '../../components/NutrientRow';
import DeleteIcon from '../../components/DeleteIcon';
import OpenIcon from '../../components/OpenIcon';
import CloseIcon from '../../components/CloseIcon';
import EditableValue from '../../components/EditableValue';
import CenterVertically from '../../components/CenterVertically';

import './meal.css';
import HeaderRow from '../../components/HeaderRow';

const TEST_DATA = {
  calorie: 230,
  fet: 45,
  protein: 32,
  carb: 87
}


export default React.memo(function Meal(props) {
  const [showNutrients, setShowNutrients] = useState(false);
  const meal = props.meal;

  const editMealHandler = (name) => {
    props.editMealHandler(meal.mealId, name);
  };
  const toggleShowNutrients = () => {
    setShowNutrients(state => !state);
  };
  return (
    <div className="meal">
      <Card>
        <HeaderRow>
          <EditableValue
            okHandler={editMealHandler}
            value={meal.name}
          />
          <CenterVertically>
            <DeleteIcon onClick={() => props.removeHandler(meal.mealId)} />
            {showNutrients ? <CloseIcon onClick={() => toggleShowNutrients()} /> :
              <OpenIcon onClick={() => toggleShowNutrients()} />}
          </CenterVertically>
        </HeaderRow>
        <NutrientRow {...TEST_DATA} style={{ margin: '0 10px' }} />
      </Card>
      {showNutrients &&
        <Container >
          <Nutrients mealId={meal.mealId} />
        </Container>
      }
    </div>
  );
});