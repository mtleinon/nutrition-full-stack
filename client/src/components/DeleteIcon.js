import React from 'react';
import { ReactComponent as Icon } from '../assets/minus-square.svg';
import styles from './DeleteIcon.module.css';

export default function DeleteIcon({ onClick }) {
  return (
    <Icon className={styles.icon} onClick={onClick} />
  );
}

  // onClick={() => props.removeHandler(plan.planId)} />
