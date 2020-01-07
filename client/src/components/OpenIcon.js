import React from 'react';
import { ReactComponent as Icon } from '../assets/chevron-down.svg';
import styles from './OpenIcon.module.css';

export default function OpenIcon({ onClick }) {
  return (
    <Icon className={styles.icon} onClick={onClick} />
  );
}
