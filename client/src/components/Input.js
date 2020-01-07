import React, { useState } from 'react';
import styles from './Input.module.css';

export default function Input({
  initialValue, okHandler, cancelHandler }) {
  const [value, setValue] = useState(initialValue ? initialValue : '');

  const keyUpHandler = (event) => {
    if (event.key === 'Enter') {
      okHandler(value);
    } else if (event.key === 'Escape') {
      cancelHandler();
    }
  }

  return (
    <div className="headerRow">
      <input type="text"
        autoFocus
        onBlur={cancelHandler}
        className={styles.input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyUp={keyUpHandler}
      />
    </div >);
}