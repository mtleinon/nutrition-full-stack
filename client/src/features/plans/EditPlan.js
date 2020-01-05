import React, { useState } from 'react';
// import './EditPlan.scss';

export default function EditPlan({
  plan, editPlanHandler, addPlanHandler, cancelHandler }) {
  const [name, setName] = useState(plan ? plan.name : '');
  return (
    <div>
      <input type="text"
        value={name}
        onChange={(event) => setName(event.target.value)} />
      {editPlanHandler &&
        <button onClick={() => editPlanHandler(plan.planId, name)}>Ok</button>
      }
      {addPlanHandler &&
        <button onClick={() => addPlanHandler(name)}>Ok</button>
      }
      <button onClick={cancelHandler}>Cancel</button>
    </div>);
}