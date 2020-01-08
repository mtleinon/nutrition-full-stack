import React from 'react';
import styles from './Card.module.css';
export default function Card(props) {
  return (
    <div
      className={styles.card + (props.active ? ' ' + styles.active : '')}
      style={{ ...props.style }}
    >
      {props.children}
    </div>
  );
}