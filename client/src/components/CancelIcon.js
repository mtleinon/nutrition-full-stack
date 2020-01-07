import React from 'react';
import { ReactComponent as Icon } from '../assets/window-close.svg';
import styles from './CancelIcon.module.css';

export default function CancelIcon({ onClick }) {
  return (
    <Icon className={styles.icon} onClick={onClick} />
  );
}
