import React from 'react';
import styles from './WrapText.module.css';

export default function WrapText(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}