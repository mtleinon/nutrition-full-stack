import React from 'react';
import { ReactComponent as Icon } from '../assets/check-square.svg';
import { ReactComponent as Icon } from '../assets/check-square.svg';
import { ReactComponent as Icon } from '../assets/check-square.svg';
import { ReactComponent as Icon } from '../assets/check-square.svg';
import styles from './CheckIcon.module.css';

export default function CheckIcon({ onClick }) {
  return (
    <Icon className={styles.icon} onClick={onClick} color='black' />
  );
}
