import React, { useState } from 'react';
import EditPlan from './EditPlan';
import Meals from '../meals/Meals';
// import './Plan.scss';

export default function Plan(props) {
  const [editMode, setEditMode] = useState(false);
  const [showMeals, setShowMeals] = useState(false);

  const editPlanHandler = (id, name) => {
    props.editPlanHandler(id, name);
    setEditMode(false);
  };
  const cancelHandler = () => {
    setEditMode(false);
  };
  const toggleShowMeals = () => {
    setShowMeals(state => !state);
  };

  const plan = props.plan;
  return (
    <div>
      {editMode && <EditPlan
        editPlanHandler={editPlanHandler}
        cancelHandler={cancelHandler}
        plan={plan}
      />
      }
      {!editMode && <div>{plan.name}
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => props.removeHandler(plan.planId)}>Remove</button>
        <button onClick={() => toggleShowMeals()}>Show Meals</button>
      </div>
      }
      {showMeals && <Meals planId={plan.planId} />}
    </div>
  );
}