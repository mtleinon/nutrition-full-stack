import React from 'react';
import styles from './CardSmall.module.css';
export default function CardSmall(props) {
  return (
    <div className={styles.card}>
      {props.children}
    </div>
  );
}