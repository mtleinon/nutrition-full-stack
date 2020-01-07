import React, { useState } from 'react';
import CheckIcon from '../../components/CheckIcon';
import CancelIcon from '../../components/CancelIcon';
import './plan.css';
import Input from '../../components/Input';

export default function EditPlan({
  plan, editPlanHandler, addPlanHandler, cancelHandler }) {
  const [name, setName] = useState(plan ? plan.name : '');

  const keyUpHandler = (event) => {
    if (event.key === 'Enter') {
      editPlanHandler && editPlanHandler(plan.planId, name);
      addPlanHandler && addPlanHandler(name);
    }
    if (event.key === 'Escape') {
      cancelHandler();
    }
  }

  return (
    <div className="headerRow">
      <Input type="text"
        initialValue={name}
        onChange={(event) => setName(event.target.value)}
        onKeyUp={keyUpHandler}
      />
      <div className="icons">
        {editPlanHandler &&
          <CheckIcon onClick={() => editPlanHandler(plan.planId, name)} />
        }
        {addPlanHandler &&
          <CheckIcon onClick={() => addPlanHandler(name)} />
        }
        <CancelIcon onClick={cancelHandler} />
      </div>
    </div >);
}