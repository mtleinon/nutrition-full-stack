import React, { useState } from 'react';
import Input from './Input';

export default function EditableValue(props) {
  const [editMode, setEditMode] = useState(false);

  const cancelHandler = () => {
    setEditMode(false);
  };
  const okHandler = (value) => {
    setEditMode(false);
    props.okHandler(value)
  }

  if (editMode) {
    return (<Input
      okHandler={okHandler}
      cancelHandler={cancelHandler}
      initialValue={props.value}
    />);
  } else {
    return (<div>
      <div onClick={() => setEditMode(true)}>
        {props.value}
      </div>
    </div>);
  }
}