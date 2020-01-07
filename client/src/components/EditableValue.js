import React, { useState } from 'react';
import Input from './Input';
import styles from './EditableValue.module.css';
import CenterVertically from './CenterVertically';

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
      type={props.type}
      okHandler={okHandler}
      cancelHandler={cancelHandler}
      initialValue={props.value}
    />);
  }
  return (
    <div className={styles.text + (props.type !== 'number' ? ' ' + styles.breakLine : '')}
      onClick={() => setEditMode(true)}>
      <CenterVertically>
        {props.value}
      </CenterVertically>
    </div>
  );

}