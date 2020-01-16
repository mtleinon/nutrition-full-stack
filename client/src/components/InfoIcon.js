import React from 'react';
import { ReactComponent as Icon } from '../assets/info-circle.svg';
import styles from './Icon.module.css';

export default function InfoIcon({ onClick }) {
  return (
    <Icon className={styles.icon} onClick={onClick} fill='yellow' />
  );
}
