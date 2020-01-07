import React from 'react';
import './nutrient.css';
import CardSmall from '../../components/CardSmall';
import HeaderRow from '../../components/HeaderRow';
import DeleteIcon from '../../components/DeleteIcon';
import NutrientRow from '../../components/NutrientRow';
import EditableValue from '../../components/EditableValue';

const TEST_DATA = {
  calorie: 230,
  fet: 45,
  protein: 32,
  carb: 87
}

export default React.memo(function Nutrient(props) {
  const nutrient = props.nutrient;

  const editNutrientHandler = (amount) => {
    props.editNutrientHandler(
      nutrient.nutrientId, amount, nutrient.mealId, nutrient.finelliId);
  };

  return (
    <CardSmall>
      <HeaderRow>
        <div>
          {nutrient.finelliId}. {props.name}
        </div>
        <EditableValue
          okHandler={editNutrientHandler}
          value={nutrient.amount}
        />
        <div className="icons" >
          <DeleteIcon onClick={() => props.removeHandler(nutrient.nutrientId)} />
        </div>
      </HeaderRow>
      <NutrientRow {...TEST_DATA} />
    </CardSmall>
  );
});