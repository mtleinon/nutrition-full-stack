import React, { useState } from 'react';
import EditMeal from './EditMeal';
// import './Meal.scss';

export default function Meal(props) {
  const [editMode, setEditMode] = useState(false);

  const editMealHandler = (id, name) => {
    props.editMealHandler(id, name);
    setEditMode(false);
  }; //
  const cancelHandler = () => {
    setEditMode(false);
  };

  const meal = props.meal;
  return (
    <div>
      {editMode && <EditMeal
        editMealHandler={editMealHandler}
        cancelHandler={cancelHandler}
        meal={meal}
      />
      }
      {!editMode && <div>{meal.name}
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => props.removeHandler(meal.mealId)}>Remove</button>
      </div>
      }
    </div>
  );
}