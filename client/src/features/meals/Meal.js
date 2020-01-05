import React, { useState } from 'react';
import EditMeal from './EditMeal';
import Nutrients from '../nutrients/Nutrients';
import './meal.css';

export default function Meal(props) {
  const [editMode, setEditMode] = useState(false);
  const [showNutrients, setShowNutrients] = useState(false);

  const editMealHandler = (id, name) => {
    props.editMealHandler(id, name);
    setEditMode(false);
  }; //
  const cancelHandler = () => {
    setEditMode(false);
  };
  const toggleShowNutrients = () => {
    setShowNutrients(state => !state);
  };
  const meal = props.meal;
  return (
    <div className="meal">
      {editMode && <EditMeal
        editMealHandler={editMealHandler}
        cancelHandler={cancelHandler}
        meal={meal}
      />
      }
      {!editMode && <div>{meal.name}
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => props.removeHandler(meal.mealId)}>Remove</button>
        <button onClick={() => toggleShowNutrients()}>Show Nutrients</button>

      </div>
      }
      {showNutrients && <Nutrients mealId={meal.mealId} />}

    </div>
  );
}