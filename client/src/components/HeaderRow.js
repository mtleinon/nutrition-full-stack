import React from 'react';
import styles from './HeaderRow.module.css';

export default function HeaderRow(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}