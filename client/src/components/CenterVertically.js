import React from 'react';
import styles from './CenterVertically.module.css';

export default function CenterVertically(props) {
  return (
    <div className={styles.container} style={props.style}>
      {props.children}
    </div>
  )
}