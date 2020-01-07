import React, { useState } from 'react';
import './nutrient.css';
import CardSmall from '../../components/CardSmall';
import Input from '../../components/Input';
import HeaderRow from '../../components/HeaderRow';
import DeleteIcon from '../../components/DeleteIcon';
import NutrientRow from '../../components/NutrientRow';
const TEST_DATA = {
  calorie: 230,
  fet: 45,
  protein: 32,
  carb: 87
}

export default React.memo(function Nutrient(props) {
  const [editMode, setEditMode] = useState(false);
  const nutrient = props.nutrient;

  const editNutrientHandler = (amount) => {
    props.editNutrientHandler(
      nutrient.nutrientId, amount, nutrient.mealId, nutrient.finelliId);
    setEditMode(false);
  };
  const cancelHandler = () => {
    setEditMode(false);
  };

  return (
    <CardSmall>
      {editMode && <HeaderRow>
        {nutrient.finelliId}. {props.name}
        <Input

          okHandler={editNutrientHandler}
          cancelHandler={cancelHandler}
          initialValue={nutrient.amount}
        />
      </HeaderRow>
      }
      {!editMode &&
        <HeaderRow>
          <div>
            {nutrient.finelliId}. {props.name}
          </div>
          <div style={{ display: 'flex' }}>
            <div onClick={() => setEditMode(true)}>
              {nutrient.amount}
            </div>
            <div className="icons" >
              <DeleteIcon onClick={() => props.removeHandler(nutrient.nutrientId)} />
            </div>
          </div>
        </HeaderRow>
      }
      <NutrientRow {...TEST_DATA} />

    </CardSmall>
  );
});