import React, { useState } from 'react';

export default function EditMeal({
  meal, editMealHandler, addMealHandler, cancelHandler, planId }) {
  const [name, setName] = useState(meal ? meal.name : '');
  return (
    <div>
      <input type="text"
        value={name}
        onChange={(event) => setName(event.target.value)} />
      {editMealHandler &&
        <button onClick={() => editMealHandler(meal.mealId, name)}>Ok</button>
      }
      {addMealHandler &&
        <button onClick={() => addMealHandler(name, '', planId)}>Ok</button>
      }
      <button onClick={cancelHandler}>Cancel</button>
    </div>);
}