import React from 'react';
import { ReactComponent as Icon } from '../assets/pen-square.svg';
import styles from './EditIcon.module.css';

export default function EditIcon({ onClick }) {
  return (
    <Icon className={styles.icon} onClick={onClick} />
  );
}

  // onClick={() => props.removeHandler(plan.planId)} />
