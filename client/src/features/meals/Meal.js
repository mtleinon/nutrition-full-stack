import React, { useState } from 'react';
import Nutrients from '../nutrients/Nutrients';
import Card from '../../components/Card';
import Container from '../../components/Container';
import NutrientRow from '../../components/NutrientRow';
import DeleteIcon from '../../components/DeleteIcon';
import EditIcon from '../../components/EditIcon';
import OpenIcon from '../../components/OpenIcon';
import CloseIcon from '../../components/CloseIcon';
import Input from '../../components/Input';

import './meal.css';
import HeaderRow from '../../components/HeaderRow';

const TEST_DATA = {
  calorie: 230,
  fet: 45,
  protein: 32,
  carb: 87
}


export default React.memo(function Meal(props) {
  const [editMode, setEditMode] = useState(false);
  const [showNutrients, setShowNutrients] = useState(false);
  const meal = props.meal;

  const editMealHandler = (name) => {
    props.editMealHandler(meal.mealId, name);
    setEditMode(false);
  }; //
  const cancelHandler = () => {
    setEditMode(false);
  };
  const toggleShowNutrients = () => {
    setShowNutrients(state => !state);
  };
  return (
    <div className="meal">
      <Card>
        <HeaderRow>
          {editMode && <Input
            okHandler={editMealHandler}
            cancelHandler={cancelHandler}
            initialValue={meal.name}
          />
          }
          {!editMode && <>
            <div onClick={() => setEditMode(true)}>
              {meal.name}
            </div>
            <div>
              <EditIcon onClick={() => setEditMode(true)} />
              <DeleteIcon onClick={() => props.removeHandler(meal.mealId)} />
              {showNutrients ? <CloseIcon onClick={() => toggleShowNutrients()} /> :
                <OpenIcon onClick={() => toggleShowNutrients()} />}
            </div>
          </>
          }
        </HeaderRow>
        <NutrientRow {...TEST_DATA} />
      </Card>
      {showNutrients &&
        <Container >

          <Nutrients mealId={meal.mealId} />
        </Container>
      }
    </div>
  );
});