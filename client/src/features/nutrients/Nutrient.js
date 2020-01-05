import React, { useState } from 'react';
import EditNutrient from './EditNutrient';
import './nutrient.css';

export default function Nutrient(props) {
  const [editMode, setEditMode] = useState(false);

  const editNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    props.editNutrientHandler(nutrientId, amount, mealId, finelliId);
    setEditMode(false);
  }; //
  const cancelHandler = () => {
    setEditMode(false);
  };

  const nutrient = props.nutrient;
  return (
    <div className="nutrient">
      {editMode && <EditNutrient
        editNutrientHandler={editNutrientHandler}
        cancelHandler={cancelHandler}
        nutrient={nutrient}
        mealId={nutrient.mealId}
      />
      }
      {!editMode && <div>{nutrient.finelliId}. {nutrient.amount}
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => props.removeHandler(nutrient.nutrientId)}>Remove</button>
      </div>
      }
    </div>
  );
}